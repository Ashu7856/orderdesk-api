const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// GET /orders?page=1&limit=10
// Returns orders newest-first, one page at a time.
router.get('/', async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));

    const [data, total] = await Promise.all([
      Order.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Order.countDocuments(),
    ]);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
