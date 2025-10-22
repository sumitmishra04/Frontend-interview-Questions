import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ACCESS_SECRET = 'dev-access-secret';
const REFRESH_SECRET = "refresh-secret-key";

const ACCESS_TOKEN_LIFETIME = "15s";
const REFRESH_TOKEN_LIFETIME = "70s";

const app = express();
const PORT = 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003"
];


app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

function verifyCredentials(username, password) {
  if (username === "sumit" && password === "password123") {
    return { id: "u1", name: "Sumit", role: "admin" };
  }
  return null;
}


function createAccessToken(user) {
  return jwt.sign(user, ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_LIFETIME }); // 30s demo expiry
}

function createRefreshToken(user) {
  return jwt.sign(user, REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_LIFETIME });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Token missing" });
  }
  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, ACCESS_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = verifyCredentials(username, password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const token = createAccessToken(user);
  const refreshToken = createRefreshToken({ id: user.id });

    console.log('refreshToken 1 >>>>', refreshToken)

  res.cookie("refreshToken", refreshToken, {
    httpOnly: false,
    sameSite: "lax",
    maxAge: 30 * 1000 ,
    path: "/" 
  })

  return res.json({ accessToken: token, user });
});

app.post("/api/auth/refresh", (req, res) => {
  const { refreshToken } = req.cookies;
  console.log('refreshToken >>>>', refreshToken)
  if (!refreshToken) return res.status(401).json({ error: "Missing refresh token" });

  try {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET);
    const user = { id: payload.id, name: "Sumit", role: "admin" };
    const newAccessToken = createAccessToken(user);

    return res.json({ accessToken: newAccessToken, user });
  } catch {
    return res.status(403).json({ error: "Refresh token expired" });
  }
});


app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("refreshToken");
  
  return res.json({ message: "Logged out and refresh token cleared" });
});


app.get("/api/selfProfile", authenticateToken, (req, res) => {
  return res.json({ user: req.user });
});

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
