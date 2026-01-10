import express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/db.js';
import userroutes from './routes/userroutes.js';
import airoutes from './routes/airoutes.js';
import boardroutes from './routes/boardroutes.js';
import pinroutes from './routes/pinroutes.js';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import cors from 'cors'



dotenv.config();


// ✅ Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.Cloud_name,
  api_secret: process.env.Cloud_secret,
  api_key: process.env.Cloud_api,
});

const app = express();

app.get("/ping", (req, res) => {
  console.log("🔥 PING HIT");
  res.json({ ok: true });
});

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: "https://stellix-2-0-frontend.onrender.com", // 👈 frontend render URL
  credentials: true,
}));

app.use((req, res, next) => {
  console.log("🌐 REQUEST:", req.method, req.url);
  next();
});

// ✅ API Routes
app.use('/api/user', userroutes);
app.use('/api/pins', pinroutes);
app.use('/api/boards', boardroutes);
app.use('/api/ai', airoutes);

// ✅ Start Server + Connect DB
const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  console.log(`✅ Server running on ${PORT}`);
  await connectDb();
});
