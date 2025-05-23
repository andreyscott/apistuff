const request = require('supertest');
const app = require('../api/index.js');

describe('POST /api/v1/payments', () => {
  it('should return 400 if fields are missing', async () => {
    const res = await request(app).post('/api/v1/payments').send({});
    expect(res.statusCode).toEqual(400);
  });
});
