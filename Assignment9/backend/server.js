const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');
const multer = require('multer'); 
const path = require('path');
const fs = require('fs'); 

dotenv.config();


if (!process.env.MONGODB_URI || !process.env.PORT) {
  throw new Error('Missing environment variables. Please check .env file');
}

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;


app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath); 
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

const upload = multer({ storage });


app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(200).json({
    message: 'File uploaded successfully',
    fileUrl,
  });
});


app.get('/images', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to fetch images' });
    }

    // 构建每个文件的完整 URL 列表
    const images = files.map((file) => ({
      url: `${req.protocol}://${req.get('host')}/uploads/${file}`,
      name: file, // 文件名作为默认名称
    }));

    res.status(200).json(images);
  });
});


// 用户相关路由
app.use('/api/users', userRoutes);

// 错误处理中间件
app.use(errorMiddleware);

// MongoDB 连接
console.log('Connecting to MongoDB:', mongoURI);
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });