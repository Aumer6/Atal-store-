const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// =================== MONGODB ===================
// (اگر دیتابیس نداری فعلاً می‌تونی comment کنی)
mongoose.connect("YOUR_MONGODB_URL")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// =================== MULTER UPLOAD ===================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// upload route
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ imageUrl: "/uploads/" + req.file.filename });
});

// serve uploads
app.use("/uploads", express.static("uploads"));

// =================== PRODUCT API ===================
const Product = require("./product");

app.post("/product", async (req, res) => {
  const data = new Product(req.body);
  await data.save();
  res.json(data);
});

app.get("/product", async (req, res) => {
  const data = await Product.find();
  res.json(data);
});

// =================== HOME ===================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// =================== SERVER ===================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
