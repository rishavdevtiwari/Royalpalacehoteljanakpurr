import express from "express";
import dotenv from "dotenv";
import path from "path";

const app = express();

dotenv.config();

const PORT = 8080;

const __dirname = path.resolve();

app.use(express.json());

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("/hello", (req, res) => {
  res.send("Hello World! API is working fine.");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
