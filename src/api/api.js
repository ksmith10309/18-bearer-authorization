import express from 'express';
const router = new express.Router();

import Calendar from '../models/calendar.js';
import sendJSON from '../middleware/sendJSON.js';
import idNotProvided from '../middleware/idNotProvided.js';
import idNotFound from '../middleware/idNotFound.js';
import error from '../middleware/error.js';
import auth from '../auth/middleware.js';

router.get('/api/calendar/:id', auth('read'), (req, res) => {
  Calendar.findById(req.params.id)
    .then(data => sendJSON(res, data))
    .catch(err => idNotFound(err, req, res));
});

router.get('/api/calendar/:id/user', auth('read'), (req, res) => {
  Calendar.findById(req.params.id).populate('user')
    .then(data => sendJSON(res, data.user))
    .catch(err => idNotFound(err, req, res));
});

router.get('/api/calendar', idNotProvided);

router.delete('/api/calendar/:id', auth('delete'), (req, res) => {
  Calendar.findByIdAndDelete(req.params.id)
    .then(() => {
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 204;
      res.statusMessage = 'No Content';
      res.end();
    })
    .catch(err => idNotFound(err, req, res));
});

router.delete('/api/calendar', idNotProvided);

router.post('/api/calendar', auth('create'), (req, res) => {
  if (Object.keys(req.body).length === 0) {
    let error = {error:'No request body was provided'};
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(error));
    return;
  }
  Calendar.create(req.body)
    .then(data => sendJSON(res, data))
    .catch(err => error(err, req, res));
});

router.put('/api/calendar/:id', auth('update'), (req, res) => {
  if (Object.keys(req.body).length === 0) {
    let error = {error:'No request body was provided'};
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(error));
    return;
  }
  Calendar.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(data => sendJSON(res, data))
    .catch(err => idNotFound(err, req, res));
});

router.put('/api/calendar', idNotProvided);

export default router;
