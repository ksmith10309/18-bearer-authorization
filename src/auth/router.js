import express from 'express';

const authRouter = express.Router();

import User from './model.js';
import auth from './middleware.js';
import badRequest from '../middleware/400.js';

authRouter.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then( (user) => {
      req.token = user.generateToken();
      res.send(req.token);
    }).catch(err => badRequest(err, req, res, next));
});

authRouter.post('/signin', auth(), (req, res) => {
  res.send(req.token);
});

export default authRouter;
