const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// GET /orders?page=1&limit=10
// Returns orders newest-first, one page at a time.
router.get('/', async (req, res, next) => {
  try {
       const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
       const [data, total] = await Promise.all([
      Order.aggregate([
        { $sort: { createdAt: -1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
      ]),
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
