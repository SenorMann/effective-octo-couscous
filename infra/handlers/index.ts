import cors from "cors";
import express from "express";
// import serverless from 'serverless-http';
import serverless from "@vendia/serverless-express";

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

export const handler = serverless({
  app,
  binaryMimeTypes: ["image/*"],
});
