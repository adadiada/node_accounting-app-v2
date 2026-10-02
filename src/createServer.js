'use strict';

const express = require('express');
// const { expreseRouter } = require('./routers/expreseRouter');
const cors = require('cors');
const { expensesService } = require('./services/expense.service');
// const { expensesController } = require('./controllers/expres.controllers');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  const expenses = [];

  app.get('/expenses', (req, res) => {
    return res.send(expensesService.getAll());
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const notId = expensesService.getById(id);

    if (!notId) {
      return res.status(404).send({ message: 'Not found' });
    }
    res.send(notId);
  });

  app.post('/expenses', (req, res) => {
    const { expens } = req.body;

    if (!expens) {
      return res.status(400).send({ message: 'Bad request' });
    }

    const ex = expensesService.create(expens);

    res.status(201).json(ex);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;

    if (!expensesService.getById(id)) {
      res.status(404).send({ message: 'Not found' });

      return;
    }
    expensesService.deletaById(id);

    return res.status(204);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expensUpdate = expensesService.upDate(id);

    if (!expensUpdate) {
      return res.status(404).send({ message: 'Not found' });
    }

    Object.assign(expensUpdate, req.body);
    res.json(expensUpdate);
  });

  // region users # //

  const users = [];

  app.get('/users', (req, res) => {
    return res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).send({ message: 'Not found' });
    }
    res.send(user);
  });

  app.post('/users', (req, res) => {
    const newUser = { ...req.body, id: Date.now().toString() };

    if (!newUser) {
      return res.status(400).send({ message: 'Bad request' });
    }
    users.push(newUser);
    res.status(201).json(newUser);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).send({ message: 'Not found' });
    }

    const newUserDelete = users.splice(index, 1);

    return res.json(newUserDelete);
  });

  app.patch('/users/:id', (req, res) => {
    const { id } = req.params;

    const userUpdate = users.find((u) => u.id === id);

    if (!userUpdate) {
      return res.status(404).send({ message: 'Not found' });
    }

    Object.assign(userUpdate, req.body);
    res.json(userUpdate);
  });

  return app;
}

// Use express to create a server
// Add a routes to the server
// Return the server (express app)

module.exports = {
  createServer,
};
