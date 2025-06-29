const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('User Auth API Tests', () => {
  let server;

  before((done) => {
    server = app.listen(4000, () => {
      console.log('Test server running on port 4000');
      done();
    });
  });

  after(async () => {
    await User.deleteMany({ username: 'testuser' });
    await mongoose.connection.close();
    server.close();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', (done) => {
      request(server)
        .post('/api/auth/register')
        .send({ username: 'testuser', password: 'testpass' })
        .expect(201)
        .expect((res) => {
          if (!('token' in res.body)) throw new Error('missing token');
        })
        .end(done);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in a user', (done) => {
      request(server)
        .post('/api/auth/login')
        .send({ username: 'testuser', password: 'testpass' })
        .expect(200)
        .expect((res) => {
          if (!('token' in res.body)) throw new Error('missing token');
        })
        .end(done);
    });
  });
});
