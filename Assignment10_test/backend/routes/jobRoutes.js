const express = require('express');
const Job = require('../models/Job');
const router = express.Router();

// 中间件：验证用户是否为管理员
const verifyAdmin = (req, res, next) => {
  const { type } = req.user; // 假设解码后的 JWT 包含用户类型
  if (type !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

// 创建职位 API（仅管理员可访问）
router.post('/create/job', verifyAdmin, async (req, res) => {
  const { companyName, jobTitle, description, salary } = req.body;

  if (!companyName || !jobTitle || !description || !salary) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const job = await Job.create({ companyName, jobTitle, description, salary });
    res.status(201).json({ message: 'Job created successfully', job });
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error: error.message });
  }
});

router.get('/jobs', async (req, res) => {
    const { page = 1, limit = 6 } = req.query;
  
    try {
      const skip = (page - 1) * limit;
      const jobs = await Job.find()
        .skip(skip)
        .limit(Number(limit));
  
      const totalJobs = await Job.countDocuments();
      const totalPages = Math.ceil(totalJobs / limit);
  
      res.json({
        jobs,
        totalJobs,
        totalPages,
        currentPage: Number(page),
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching jobs', error: error.message });
    }
  });
  

module.exports = router;
