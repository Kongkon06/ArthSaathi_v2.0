

import { PrismaClient } from '../generated/prisma/client.js';
const prisma = new PrismaClient();


// Create a transaction
async function createTransaction(req, res) {
  const { accountId, amount, type, status, category } = req.body;

  // Validate input
  if (!accountId || !amount || !type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const transactionResult = await prisma.$transaction(async (tx) => {
      // Get current balance
      const account = await tx.accounts.findUnique({
        where: { id: accountId },
      });

      if (!account) {
        throw new Error('Account not found');
      }

      let newBalance = account.current_balance;

      // Calculate new balance
      if (type === 'Debit') {
        if (account.current_balance < amount) {
          throw new Error('Insufficient balance');
        }
        newBalance -= amount;
      } else if (type === 'Credit') {
        newBalance += amount;
      } else {
        throw new Error('Invalid transaction type');
      }

      // Update account balance
      await tx.accounts.update({
        where: { id: accountId },
        data: { current_balance: newBalance },
      });

      // Create the transaction
      const newTransaction = await tx.transactions.create({
        data: {
          accountId,
          category,
          amount,
          type,
          status,
        },
      });

      return newTransaction;
    });

    res.status(200).json(transactionResult);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to create transaction', details: error.message });
  }
}


// Get all transactions
 async function getAllTransaction(req, res){
  try {
    const accountId = req.params.id
    const transactions = await prisma.transactions.findMany({
      where:{
        accountId: accountId
      }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

// Get a transaction by ID
async function getTransaction(req, res){
  const { id } = req.params;
  try {
    const transaction = await prisma.transactions.findUnique({
      where: { id },
    });
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transaction' });
  }
};

// Update a transaction
async function updateTransaction(req, res){
  const { id } = req.params.id;
  const { amount, type, status } = req.body;
  try {
    const transaction = await prisma.transactions.update({
      where: { id },
      data: {
        amount,
        type,
        status,
      },
    });
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: 'Error updating transaction' });
  }
};

// Delete a transaction
async function deleteTransaction(req, res) {
  const { id } = req.params;
  try {
    await prisma.transactions.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting transaction' });
  }
};

export default {
  createTransaction,
  getAllTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction
};
