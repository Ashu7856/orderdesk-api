const mongoose = require('mongoose');
const { createApp } = require('./app');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/orderdesk';
const PORT = process.env.PORT || 3000;

async function main() {
  await mongoose.connect(MONGO_URL);
  createApp().listen(PORT, () => console.log(`orderdesk-api listening on :${PORT}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
