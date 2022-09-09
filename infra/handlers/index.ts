import serverless from "@vendia/serverless-express";
import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import cors from "cors";
import express from "express";
import v1Router from "./v1";
import v2Router from "./v2";

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/v1", v1Router);
app.use("/v2", v2Router);
app.use("*", (req, res) => {
  res.status(404).json({ message: `Cannot ${req.method} ${req.path}` });
});

const handler = serverless({
  app,
  binaryMimeTypes: ["image/*"],
});

export async function main(event: APIGatewayEvent, context: Context, callback: Callback) {
  console.log(event);
  const response = await handler(event, context, callback); 
  console.log(response);
  return response;
}