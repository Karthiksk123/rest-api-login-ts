import express from "express";
import authenticationRoute from "./authenticationRoute";
import userRoutes from "./userRoutes";

const router = express.Router();

export default (): express.Router => {
  authenticationRoute(router);
  userRoutes(router);
  return router;
};
