import { moduleHosts } from '../../src/utils/config'
import request from 'supertest'
import app from '../../src/app'

const GOVERNMENT_HOST = moduleHosts.government

// Test /auth/register
// Test /auth/login

describe('Test gov /auth/login', () => {
  it('POST / => login with valid user', async () => {
    const res = await request(`${GOVERNMENT_HOST}`).post('/auth/login/').send({
      CitizenID: "2222222222222",
      lazerID: "JT9999999998"
    })
    expect(res.status).toBe(200)
    expect(res.error).toBe(false)
    expect(res.body.token).not.toBeNull()
  });

  it('POST / => login with invalid user CitizenID', async () => {
    const res = await request(`${GOVERNMENT_HOST}`).post('/auth/login/').send({
      CitizenID: "A234567891234",
      lazerID: "1234AB"
    })
    expect(res.status).toBe(401)
    expect(res.error).not.toBe(false)
    expect(res.body).toEqual(
      expect.objectContaining({
          message: "Can't authenticate with this citizenID and lazerID"
      })
    )
  });

  it('POST / => login with exceed CitizenID digits', async () => {
    const res = await request(`${GOVERNMENT_HOST}`).post('/auth/login/').send({
      CitizenID: "12345678912345",
      lazerID: "1234AB"
    })
    expect(res.status).toBe(401)
    expect(res.error).not.toBe(false)
    expect(res.body).toEqual(
      expect.objectContaining({
          message: "Can't authenticate with this citizenID and lazerID"
      })
    )
  });

  it('POST / => login with invalid user lazerID', async () => {
    const res = await request(`${GOVERNMENT_HOST}`).post('/auth/login/').send({
      CitizenID: "2222222222222",
      lazerID: "1234ABC"
    })
    expect(res.status).toBe(401)
    expect(res.error).not.toBe(false)
    expect(res.body).toEqual(
      expect.objectContaining({
          message: "Can't authenticate with this citizenID and lazerID"
      })
    )
  });

  it('POST / => login with empty CitizenID', async () => {
    const res = await request(`${GOVERNMENT_HOST}`).post('/auth/login/').send({
      CitizenID: "",
      lazerID: "1234AB"
    })
    expect(res.status).toBe(401)
    expect(res.error).not.toBe(false)
    expect(res.body).toEqual(
      expect.objectContaining({
          message: "Can't authenticate with this citizenID and lazerID"
      })
    )
  });

  it('POST / => login with empty lazerID', async () => {
    const res = await request(`${GOVERNMENT_HOST}`).post('/auth/login/').send({
      CitizenID: "2222222222222",
      lazerID: ""
    })
    expect(res.status).toBe(401)
    expect(res.error).not.toBe(false)
    expect(res.body).toEqual(
      expect.objectContaining({
          message: "Can't authenticate with this citizenID and lazerID"
      })
    )
  });

  it('POST / => login with both field empty', async () => {
    const res = await request(`${GOVERNMENT_HOST}`).post('/auth/login/').send({
      CitizenID: "",
      lazerID: ""
    })
    expect(res.status).toBe(401)
    expect(res.error).not.toBe(false)
    expect(res.body).toEqual(
      expect.objectContaining({
          message: "Can't authenticate with this citizenID and lazerID"
      })
    )
  });
})

describe('Test gov /user/info', () => {
  it('GET / => request with valid TOKEN', async () => {
    const res = await request(`${GOVERNMENT_HOST}`).post('/auth/login/').send({
      CitizenID: "2222222222222",
      lazerID: "JT9999999998"
    })
    expect(res.status).toBe(200)
    expect(res.error).toBe(false)
    expect(res.body.token).not.toBeNull()

    const res1 = await request(`${GOVERNMENT_HOST}`).get('/user/info/').set('Authorization', `Bearer ${res.body.token}`)
    expect(res1.status).toBe(200)
    expect(res1.error).toBe(false)
    expect(res.body.CitizenID).not.toBeNull()
    expect(res.body.LazerID).not.toBeNull()
    expect(res.body.Name).not.toBeNull()
    expect(res.body.Lastname).not.toBeNull()
    expect(res.body.Birthday).not.toBeNull()
    expect(res.body.Nationality).not.toBeNull()
    expect(res.body.DistricID).not.toBeNull()
  });

  it('GET / => request with invalid TOKEN', async () => {
    const res = await request(`${GOVERNMENT_HOST}`).get('/user/info/').set('Authorization', `Bearer abc`)
    expect(res.status).toBe(401)
    expect(res.error).not.toBe(false)
    expect(res.body).toEqual(
      expect.objectContaining({
          message: "Can't authenticate with this citizenID and lazerID"
      })
    )
  });
})

describe('Test gov /validity', () => {
  it('GET / => request with valid TOKEN', async () => {
    const res = await request(`${GOVERNMENT_HOST}`).post('/auth/login/').send({
      CitizenID: "2222222222222",
      lazerID: "JT9999999998"
    })
    expect(res.status).toBe(200)
    expect(res.error).toBe(false)
    expect(res.body.token).not.toBeNull()

    const res1 = await request(`${GOVERNMENT_HOST}`).get('/validity').set('Authorization', `Bearer ${res.body.token}`)
    expect(res1.status).toBe(200)
    expect(res1.error).toBe(false)
  })
})