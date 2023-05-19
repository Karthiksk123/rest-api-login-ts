import lodash from "lodash";
import express from "express";
import { get, merge } from "lodash";
import { getuserBySessionToken } from "../models/user";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["USER_AUTH"];

    if (!sessionToken) {
      return res.status(403).json("user is not Authenticated");
    }

    const existingUser = await getuserBySessionToken(sessionToken);

    if (!existingUser) {
      return res.status(400).json("User not Found");
    }

    merge(req, {
      identity: existingUser,
    });

    return next();
  } catch (error) {
    return res.status(200).json(error);
  }
};
