import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "../routes";

export default () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/", routes());
  return app;
};
