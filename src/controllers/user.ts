import express from "express";
import { deleteUserById, getUsers } from "../models/user";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users).end();
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    if(!deletedUser) {
        return res.status(403).json("User is not Found")
    }

    return res
      .status(200)
      .json(
        `User is deleted have the name of ${deletedUser.username} and id : ${deletedUser._id}`
      );
  } catch (error) {
    return res.status(400).json(error);
  }
};
