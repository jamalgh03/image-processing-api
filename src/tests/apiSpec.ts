import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('API Endpoint Tests', () => {
  it('returns 200 for valid request', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=200',
    );
    expect(response.status).toBe(200);
  });

  it('fails when parameters are missing', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(400);
  });

  it('fails when image does not exist', async () => {
    const response = await request.get(
      '/api/images?filename=wrong&width=200&height=200',
    );
    expect(response.status).toBe(404);
  });

  it('fails with invalid width/height', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=-1&height=200',
    );
    expect(response.status).toBe(400);
  });
});
