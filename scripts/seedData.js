// 60 orders, created in 6 bulk batches of 10.
// Every order in a batch shares the exact same createdAt (like a bulk import).
function buildOrders() {
  const base = new Date('2026-10-01T09:00:00.000Z').getTime();
  const statuses = ['pending', 'paid', 'shipped'];
  const orders = [];
  for (let batch = 0; batch < 6; batch++) {
    const createdAt = new Date(base + batch * 60 * 60 * 1000);
    for (let i = 0; i < 10; i++) {
      const n = batch * 10 + i + 1;
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

module.exports = { buildOrders };
