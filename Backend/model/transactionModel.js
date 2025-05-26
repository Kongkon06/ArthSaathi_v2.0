import express from 'express';

import { PrismaClient } from '../generated/prisma/client.js';
const prisma = new PrismaClient();


// Create a transaction
async function createTransaction(req, res){
  const { accountId, amount, type, status } = req.body;
  try {
    const transaction = await prisma.transactions.create({
      data: {
        accountId,
        amount,
        type,
        status,
      },
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create transaction', details: error.message });
  }
};

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
