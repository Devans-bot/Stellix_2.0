import express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/db.js';
import userroutes from './routes/userroutes.js';
import airoutes from './routes/airoutes.js';
import boardroutes from './routes/boardroutes.js';
import pinroutes from './routes/pinroutes.js';
import cloudinary from 'cloudinary';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';

dotenv.config();

// ✅ Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.Cloud_name,
  api_secret: process.env.Cloud_secret,
  api_key: process.env.Cloud_api,
});

const app = express();
app.set("trust proxy", 1);

// ✅ Middlewares
app.use("/api", compression());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://stellix-2-0-q2gg2og7p-divyanshs-projects-8b969f2d.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));




app.use(express.json());

// ✅ API Routes
app.use('/api/user', userroutes);
app.use('/api/pins', pinroutes);
app.use('/api/boards', boardroutes);
app.use('/api/ai', airoutes);

app.get("/", (req, res) => {
  res.send("🚀 Stellix Backend is running");
});

// ✅ Start Server + Connect DB
const PORT = process.env.PORT||5000;

app.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);
  await connectDb();
});
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("JWT_SEC:", process.env.JWT_SEC);
