import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('API Endpoint', () => {
  it('returns resized image', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=200',
    );
    expect(response.status).toBe(200);
  });

  it('fails with missing params', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(400);
  });
});
