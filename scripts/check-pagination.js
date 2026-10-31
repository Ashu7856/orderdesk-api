// Walks every page of /orders and reports duplicate or missing orders.
// Usage: npm run check:pagination   (server must be running)
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const LIMIT = 10;

async function main() {
  const seen = new Map();
  let total = 0;
  let totalPages = 1;

  for (let page = 1; page <= totalPages; page++) {
    const res = await fetch(`${BASE_URL}/orders?page=${page}&limit=${LIMIT}`);
    const body = await res.json();
    total = body.total;
    totalPages = body.totalPages;
    for (const o of body.data) {
      seen.set(o.orderNumber, (seen.get(o.orderNumber) || 0) + 1);
    }
  }

  const duplicates = [...seen.entries()].filter(([, c]) => c > 1).map(([id]) => id);
  const missing = total - seen.size;

  console.log(`total=${total} unique=${seen.size} duplicates=${duplicates.length} missing=${missing}`);
  if (duplicates.length) console.log('Duplicated:', duplicates.join(', '));

  process.exit(duplicates.length || missing ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
