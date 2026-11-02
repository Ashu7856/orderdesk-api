const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { createApp } = require('../src/app');
const Order = require('../src/models/Order');
const { buildOrders } = require('../scripts/seedData');

let mongod;
let app;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
  await Order.insertMany(buildOrders());
  app = createApp();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('GET /health', () => {
  it('returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /orders', () => {
  it('returns the first page with default limit', async () => {
    const res = await request(app).get('/orders');
    expect(res.status).toBe(200);
    expect(res.body.page).toBe(1);
    expect(res.body.limit).toBe(10);
    expect(res.body.total).toBe(60);
    expect(res.body.totalPages).toBe(6);
    expect(res.body.data).toHaveLength(10);
  });

  it('respects the limit parameter', async () => {
    const res = await request(app).get('/orders?limit=5');
    expect(res.body.data).toHaveLength(5);
    expect(res.body.totalPages).toBe(12);
  });

  it('returns newest orders first', async () => {
    const res = await request(app).get('/orders?limit=50');
    const times = res.body.data.map((o) => new Date(o.createdAt).getTime());
    const sorted = [...times].sort((a, b) => b - a);
    expect(times).toEqual(sorted);
  });
});
it('bad page', async () => {
const res = await request(app).get('/orders?page=abc');
expect(res.status).toBe(400);
});