import serverless from "@vendia/serverless-express";
import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.route("/")
.get((req, res) => {
  console.log(req.headers);
  res.json({ path: "/", method: "GET" });
})
.post((req, res) => {
  console.log(req.headers);
  res.json({ path: "/", method: "POST" });
})
.put((req, res) => {
  console.log(req.headers);
  res.json({ path: "/", method: "PUT" });
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