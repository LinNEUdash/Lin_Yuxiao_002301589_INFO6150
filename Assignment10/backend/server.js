const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');
const multer = require('multer'); 
const path = require('path');
const fs = require('fs'); 
const jobRoutes = require('./routes/jobRoutes');
const jwt = require('jsonwebtoken');



dotenv.config();


if (!process.env.MONGODB_URI || !process.env.PORT) {
  throw new Error('Missing environment variables. Please check .env file');
}

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

app.use((req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; 
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
  next();
});


app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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


    const images = files.map((file) => ({
      url: `${req.protocol}://${req.get('host')}/uploads/${file}`,
      name: file, 
    }));

    res.status(200).json(images);
  });
});


app.use('/api/users', userRoutes);

app.use('/api', jobRoutes);


app.use(errorMiddleware);


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


