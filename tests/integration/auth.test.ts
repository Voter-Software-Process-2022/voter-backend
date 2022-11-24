import { moduleHosts } from '../../src/utils/config'
import request from 'supertest'
import app from '../../src/app'

const GOVERNMENT_HOST = moduleHosts.government

describe('Test /auth/register', () => {
  it('POST / => create NEW user', async () => {
    // const response = await request(app).post('/api/auth/register')
    // .send({
    //     citizenID: '1111111111111',
    //     laserCode: 'JC0000000000',
    //     email: 'johndoe@gmail.com',
    //     password: 'password123',
    //     passwordConfirm: 'password123',
    // })
    // expect(response.statusCode).toBe(201)
    // expect(response.error).toBe(false)
    // expect(response.body.status).toBe('Created')

    // expect(response.body).toEqual(
    //     expect.objectContaining({
    //         status: 'success',
    //         data: {
    //           user: {
    //             citizenID: '1111111111111',
    //             laserCode: 'JC0000000000',
    //             email: 'johndoe@gmail.com',
    //           } 
    //         }
    //     })
    // )
  });
})


// use mock
describe('Test /auth/login/v2', () => {
  it('POST / => login with valid user', async () => {
    const response = await request(app).post(`${GOVERNMENT_HOST}/user/info`)
    .send({
      CitizenID: '',
      LaserID: '',
    })
    expect(response.statusCode).toBe(201)
    expect(response.error).toBe(false)
    expect(response.body.status).toBe('Created')

    expect(response.body).toEqual(
      expect.objectContaining({
        status: 'success',
        data: {
          user: {
            citizenID: '1111111111111',
            laserCode: 'JC0000000000',
            email: 'johndoe@gmail.com',
          } 
        }
      })
    )
    // token not empty
  }) 
  
  it('POST / => login with invalid user, CitizenID exceed 13 digits', async () => {
    const response = await request(app).post(`${GOVERNMENT_HOST}/user/info`)
    .send({
      CitizenID: '12345678910111213',
      LaserID: '',
    })
  })
  
  it('POST / => login with invalid user, CitizenID contain string', async () => {
    const response = await request(app).post(`${GOVERNMENT_HOST}/user/info`)
    .send({
      CitizenID: '1A23456789101',
      LaserID: '',
    })
  }) 

  it('POST / => login with invalid user, CitizenID field is empty', async () => {
    const response = await request(app).post(`${GOVERNMENT_HOST}/user/info`)
    .send({
      CitizenID: '',
      LaserID: '#',
    })
  }) 

  it('POST / => login with invalid user, LaserID', async () => {
    const response = await request(app).post(`${GOVERNMENT_HOST}/user/info`)
    .send({
      CitizenID: '1111111111111',
      LaserID: 'invalid123',
    })
  }) 

  it('POST / => login with invalid user, LaserID field is empty', async () => {
    const response = await request(app).post(`${GOVERNMENT_HOST}/user/info`)
    .send({
      CitizenID: '1111111111111',
      LaserID: '',
    })
  }) 
})
