import app from "../../../src/app"
import request from 'supertest'

describe('Test Service: User', () => {
    it('get ', async () => {
      const response = await request(app).get('/api/health')
      expect(response.statusCode).toBe(200)
      expect(response.error).toBe(false)
      expect(response.body.status).toBe('success')
      expect(response.body.message).toBe('Voter Backend')
    })
  })