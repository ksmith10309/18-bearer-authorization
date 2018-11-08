import server, { startDB, stopDB } from './supergoose.js';
import { app } from '../src/app.js';
import User from '../src/auth/model.js';

process.env.SECRET = 'password';

beforeAll(startDB);
afterAll(stopDB);

beforeEach(async () => {
  await User.deleteMany({});
});

describe('Auth Testing', () => {
  it('should return a status code of 404 for routes that have not been registered', async () => {
    const response = await server(app).patch('/signup');
    expect(response.res.statusCode).toBe(404);
    expect(response.res.statusMessage).toBe('Not Found');
  });

  it('should return a status code of 404 for routes that have not been registered', async () => {
    const response = await server(app).patch('/signin');
    expect(response.res.statusCode).toBe(404);
    expect(response.res.statusMessage).toBe('Not Found');
  });
});

describe('Auth Sign Up Testing', () => {
  it('should sign up and return a status code of 200 and a token', async () => {
    const userInfo = {
      username: 'Katherine',
      password: 'Smith',
    };
    const response = await server(app).post('/signup').send(userInfo);
    expect(response.res.statusCode).toBe(200);
    expect(response.text.split('.').length).toBe(3);
  });
  it('should return a status code of 400 if no request body has been provided', async () => {
    const response = await server(app).post('/signup').send();
    expect(response.res.statusCode).toBe(400);
    expect(response.res.statusMessage).toBe('Bad Request');
  });
  it('should return a status code of 400 if the body is invalid', async () => {
    const userInfo = {username:'Katherine'};
    const response = await server(app).post('/signup').send(userInfo);
    expect(response.res.statusCode).toBe(400);
    expect(response.res.statusMessage).toBe('Bad Request');
  });
});

describe('Auth Sign In Testing', () => {
  it('should sign in with token and return a status code of 200 and a token', async() => {
    const userInfo = {
      username: 'Katherine',
      password: 'Smith',
    };
    let response = await server(app).post('/signup').send(userInfo);
    let token = response.text;
    response = await server(app).post('/signin').auth(token, {type:'bearer'});
    expect(response.res.statusCode).toBe(200);
    expect(response.text.split('.').length).toBe(3);
  });
  it('should sign in with username/password and return a status code of 200 and a token', async() => {
    const userInfo = {
      username: 'Katherine',
      password: 'Smith',
    };
    await server(app).post('/signup').send(userInfo);
    let response = await server(app).post('/signin').auth('Katherine', 'Smith');
    expect(response.res.statusCode).toBe(200);
    expect(response.text.split('.').length).toBe(3);
  });
  test('should return a status code of 401 if the user could not be authenticated', async () => {
    const userInfo = {
      username: 'Katherine',
      password: 'Smith',
    };
    await server(app).post('/signup').send(userInfo);
    let response = await server(app).post('/signin').auth('Katherine', 'Lo');
    expect(response.res.statusCode).toBe(401);
    expect(response.res.statusMessage).toBe('Unauthorized');
  });
});
