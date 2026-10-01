'use strict';

const express = require('express');
// const { expreseRouter } = require('./routers/expreseRouter');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  // const expreseRouter = express.Router();

  // app.get('/', (req, res) => {});
  // app.get('/:id', (req, res) => {});
  // app.post('/', (req, res) => {});
  // app.delete('/:id', (req, res) => {});
  // app.patch('/:id', (req, res) => {});

  const expenses = [];

  app.get('/expenses', (req, res) => {
    return res.json(expenses);
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.status(404).send({ message: 'Not found' });
    }
    res.send(expense);
  });

  app.post('/expenses', (req, res) => {
    const newExpense = { ...req.body, id: Date.now().toString() };

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send({ message: 'Bad request' });
    }
    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const index = expenses.findIndex((ex) => ex.id === id);

    if (index === -1) {
      return res.status(404).send({ message: 'Not found' });
    }

    const newExpenseDelete = expenses.splice(index, 1);

    return res.json(newExpenseDelete);
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expensUpdate = expenses.find((e) => e.id === id);

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
