import express from "express";
import path from "path";
import cors from 'cors'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors())

const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// API route example
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express Backend 2" });
});

// ✅ Catch-all for non-API routes (React routing)
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: "API route not found" });
  }
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
