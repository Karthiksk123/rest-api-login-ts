import express from "express";
import { authentication, random } from "../helpers";
import { createUser, getUserByMail } from "../models/user";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("All fields are Mandatory !! ");
    }

    const user = await getUserByMail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(200).json("No user registered with this email id");
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.status(403).json("password is incorrect");
    }

    const salt = random();

    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("USER_AUTH", user.authentication.sessionToken, {
      domain: "localhost",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json("All fiels are mandatory!!");
    }

    const existingUser = await getUserByMail(email);

    if (existingUser) {
      return res.status(400).json("User already rgisterd with this email id");
    }

    const salt = random();

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.status(201).json(user).end();
  } catch (error) {
    res.status(500).json(error.message);
  }
};
