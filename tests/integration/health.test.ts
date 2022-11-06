import request from 'supertest'
import app from '@src/app'

describe('Test /health', () => {
  it('health should be okay', async () => {
    const response = await request(app).get('/api/health')
    expect(response.statusCode).toBe(200)
    expect(response.error).toBe(false)
    expect(response.body.status).toBe('success')
    expect(response.body.message).toBe('Voter Backend')
  })
})
