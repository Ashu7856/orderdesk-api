const mongoose = require('mongoose');
const Order = require('../src/models/Order');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/orderdesk';

// 1000 orders in 20 bulk batches of 50.
// Every order in a batch shares the exact same createdAt.
function buildBulkOrders() {
  const base = new Date('2026-10-01T09:00:00.000Z').getTime();
  const statuses = ['pending', 'paid', 'shipped'];
  const orders = [];
  for (let batch = 0; batch < 20; batch++) {
    const createdAt = new Date(base + batch * 60 * 60 * 1000);
    for (let i = 0; i < 50; i++) {
      const n = batch * 50 + i + 1;
      orders.push({
        orderNumber: `ORD-${String(n).padStart(4, '0')}`,
        customerName: `Customer ${n}`,
        amount: 100 + n * 7,
        status: statuses[n % 3],
        createdAt,
      });
    }
  }
  return orders;
}

async function main() {
  await mongoose.connect(MONGO_URL);
  await Order.deleteMany({});
  await Order.insertMany(buildBulkOrders());
  console.log('Seeded 1000 orders');
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
