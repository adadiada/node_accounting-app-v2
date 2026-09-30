const { express } = require('express');

function createExpensesRouter() {
  const expreseRouter = express.Router();

  expreseRouter.get('/', (req, res) => {});
  expreseRouter.get('/:id', (req, res) => {});
  expreseRouter.post('/', (req, res) => {});
  expreseRouter.delete('/:id', (req, res) => {});
  expreseRouter.patch('/:id', (req, res) => {});
}

module.exports = {
  createExpensesRouter,
};
