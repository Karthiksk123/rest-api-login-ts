import { isAuthenticated } from "../middlewares";
import { deleteUser, getAllUsers } from "../controllers/user";
import express from "express";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id",  deleteUser);
};
