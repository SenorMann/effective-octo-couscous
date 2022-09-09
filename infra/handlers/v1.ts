import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ version: 1 });
});

router.use("*", (req, res) => {
  res.status(404).json({ version: 1, message: `Cannot ${req.method} ${req.path}` });
})

export default router;