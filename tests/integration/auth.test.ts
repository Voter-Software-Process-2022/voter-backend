import request from 'supertest'
import app from '../../src/app'

describe('Test /auth/register', () => {
  it('POST / => create NEW user', async () => {
    const response = await request(app).post('/api/auth/register')
    .send({
        citizenID: '1111111111111',
        laserCode: 'JC0000000000',
        email: 'johndoe@gmail.com',
        password: 'password123',
        passwordConfirm: 'password123',
    })
    expect(response.statusCode).toBe(201)
    expect(response.error).toBe(false)
    expect(response.body.status).toBe('Created')
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

describe('Test /auth/login/v2', () => {
    
})
