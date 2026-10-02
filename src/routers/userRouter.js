const { express } = require('express');

function createUserRouter() {
  const userRouter = express.Router();

  userRouter.get('/', (req, res) => {});
  userRouter.get('/:id', (req, res) => {});
  userRouter.post('/', (req, res) => {});
  userRouter.delete('/:id', (req, res) => {});
  userRouter.patch('/:id', (req, res) => {});
}

module.exports = {
  createUserRouter,
};
