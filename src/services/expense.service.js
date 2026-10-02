import { v4 as uuidv4 } from 'uuid';

const expenses = [];

const getAll = (userId, categories, from, to) => {
  return expenses;
};

const getById = (id) => {
  return expenses.find((expens) => expens.id === id) || null;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const ex = {
    id: uuidv4(),
    userId: +userId,
    spentAt,
    title,
    amount: +amount,
    category,
    note,
  };

  expenses.push(ex);

  return ex;
};

const upDate = ({ id, spentAt, title, amount, category, note }) => {
  const expensUpdate = expenses.find((e) => e.id === id);

  return expensUpdate;
};

const deletaById = (id) => {
  const index = expenses.findIndex((e) => e.id === +id);

  if (index === -1) {
    return null;
  }

  const exp = expenses.splice(index, 1);

  return exp;
};

const expensesService = {
  getAll,
  getById,
  create,
  upDate,
  deletaById,
};

export default {
  expensesService,
};
