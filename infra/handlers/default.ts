import serverless from "@vendia/serverless-express";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("*", (req, res) => {
  res.status(404).json({
    message: `Cannot ${req.method} ${req.path}`,
  });
})

export const handler = serverless({ app });