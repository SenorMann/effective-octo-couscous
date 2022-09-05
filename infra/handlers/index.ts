import { APIGatewayEvent, Context } from 'aws-lambda';
import express from "express";
import serverless from 'serverless-http';
import cors from "cors";

const app = express();
app.use(cors());

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

const handler = serverless(app, { binary: ["application/json"] });
export async function main(event: APIGatewayEvent, context: Context) {
  const response = await handler(event, context);
  return response;
}