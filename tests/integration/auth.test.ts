import { moduleHosts } from '../../src/utils/config'
import request from 'supertest'
import app from '../../src/app'

const GOVERNMENT_HOST = moduleHosts.government

// Test /auth/register
// Test /auth/login

describe('Test gov /auth/login', () => {
  it('POST / => login with valid user', async () => {
    const res = await request(`${GOVERNMENT_HOST}`).post('/auth/login/').send({
      CitizenID: "1234567891234",
      lazerID: "1234AB"
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
      CitizenID: "1234567891234",
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
      CitizenID: "1234567891234",
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

describe('Test /auth/login/v2', () => {
  it('POST / => login with valid user', async () => {
    
  }) 
  
  it('POST / => login with invalid user, CitizenID exceed 13 digits', async () => {

  })
  
  it('POST / => login with invalid user, CitizenID contain string', async () => {

  }) 

  it('POST / => login with invalid user, CitizenID field is empty', async () => {

  }) 

  it('POST / => login with invalid user, LaserID', async () => {

  }) 

  it('POST / => login with invalid user, LaserID field is empty', async () => {

  }) 
})
