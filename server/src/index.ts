import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import scanRoute from "./scan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.post("/api/scan", scanRoute);

app.get("/", (_req, res) => {
  res.send("AI Accessibility Auto-Fixer API running.");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
