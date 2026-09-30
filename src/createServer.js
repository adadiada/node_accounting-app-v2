'use strict';

const express = require('express');
// const { expreseRouter } = require('./routers/expreseRouter');
const cors = require('cors');

function createServer() {
  const app = express();

  app.use(express.json());
  // app.use('/expenses', expreseRouter);
  app.use(cors());

  // const expreseRouter = express.Router();

  // app.get('/', (req, res) => {});
  // app.get('/:id', (req, res) => {});
  // app.post('/', (req, res) => {});
  // app.delete('/:id', (req, res) => {});
  // app.patch('/:id', (req, res) => {});

  const expenses = [];

  app.get('/expenses', (req, res) => {
    return res.send('Hello');
  });

  app.get('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const expense = expenses.find((e) => e.id === id);

    if (!expense) {
      return res.sendStatus(404).send({ message: 'Not found' });
    }
    res.send(expense);
  });

  app.post('/expenses', (req, res) => {
    const newExpense = { ...req.body, id: Date.now().toString() };

    if (!newExpense) {
      res.sendStatus(400).send({ message: 'Bad request' });
    }
    expenses.push(newExpense);
    res.status(201).json(newExpense);
  });

  app.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const index = expenses.findIndex((ex) => ex.id === id);

    if (index === -1) {
      res.sendStatus(404).send({ message: 'Not found' });
    }

    const newExpenseDelete = expenses.splice(index, 1);

    return newExpenseDelete;
  });

  app.patch('/expenses/:id', (req, res) => {
    const { id } = req.params;

    const expensUpdate = expenses.find((e) => e.id === id);

    if (!expensUpdate) {
      res.sendStatus(404).send({ message: 'Not found' });
    }
  });

  return app;
}

// Use express to create a server
// Add a routes to the server
// Return the server (express app)

module.exports = {
  createServer,
};
