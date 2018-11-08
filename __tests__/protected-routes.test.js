/* Stretch goal: Pass these tests */

import server, { startDB, stopDB } from './supergoose.js';
import { app } from '../src/app.js';
import User from '../src/auth/model.js';

process.env.SECRET = 'password';

beforeAll(startDB);
afterAll(stopDB);

beforeEach(async () => {
  await User.deleteMany({});
});

describe('Protected route testing', () => {

  it('should get root IF allowed', async () => {

    const userObj = {
      username: 'Katherine',
      password: 'Smith',
      email: 'Katherine@gmail.com',
      role: 'user',
    };
    let response = await server(app).post('/signup').send(userObj);
    let token = response.text;
    response = await server(app).get('/').auth(token, {type:'bearer'});
    //response = await server(app).get('/').auth('Katherine', 'Smith');
    expect(response.text).toBe('hi from /');
  });

  it('should not get root IF not allowed', async () => {

    const userObj = {
      username: 'Katherine',
      password: 'Smith',
      email: 'Katherine@gmail.com',
      role: 'user',
    };
    await server(app).post('/signup').send(userObj);
    let response = await server(app).get('/').auth('Katherine', 'Lo');
    expect(response.status).toBe(401);
    expect(response.res.statusMessage).toBe('Unauthorized');
  });

  it('should get /s IF allowed', async () => {

    const userObj = {
      username: 'Katherine',
      password: 'Smith',
      email: 'Katherine@gmail.com',
      role: 'editor',
    };
    let response = await server(app).post('/signup').send(userObj);
    let token = response.text;
    response = await server(app).get('/s').auth(token, {type:'bearer'});
    //response = await server(app).get('/').auth('Katherine', 'Smith');
    expect(response.text).toBe('hi from /s');
  });

  it('should not get /s IF not allowed', async () => {

    const userObj = {
      username: 'Katherine',
      password: 'Smith',
      email: 'Katherine@gmail.com',
      role: 'user',
    };
    let response = await server(app).post('/signup').send(userObj);
    let token = response.text;
    response = await server(app).get('/s').auth(token, {type:'bearer'});
    //response = await server(app).get('/').auth('Katherine', 'Smith');
    expect(response.res.statusCode).toBe(401);
    expect(response.res.statusMessage).toBe('Unauthorized');
  });

  it('should get /d IF allowed', async () => {

    const userObj = {
      username: 'Katherine',
      password: 'Smith',
      email: 'Katherine@gmail.com',
      role: 'admin',
    };
    let response = await server(app).post('/signup').send(userObj);
    let token = response.text;
    response = await server(app).get('/d').auth(token, {type:'bearer'});
    //response = await server(app).get('/').auth('Katherine', 'Smith');
    expect(response.text).toBe('hi from /d');
  });

  it('should not get /d IF not allowed', async () => {

    const userObj = {
      username: 'Katherine',
      password: 'Smith',
      email: 'Katherine@gmail.com',
      role: 'editor',
    };
    let response = await server(app).post('/signup').send(userObj);
    let token = response.text;
    response = await server(app).get('/d').auth(token, {type:'bearer'});
    //response = await server(app).get('/').auth('Katherine', 'Smith');
    expect(response.res.statusCode).toBe(401);
    expect(response.res.statusMessage).toBe('Unauthorized');
  });

});
