import express from "express";
import transaction from '../model/transactionModel.js';

const router = express.Router();

/**
 * @swagger
 * /transaction/create:
 *   post:
 *     summary: Create a transaction
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [Credit, Debit]
 *     responses:
 *       201:
 *         description: Transaction created
 */
router.post('/create', transaction.createTransaction);

/**
 * @swagger
 * /transaction/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction retrieved
 */
router.get('/:id', transaction.getTransaction);

/**
 * @swagger
 * /transaction/all/{id}:
 *   get:
 *     summary: Get all transactions for an account
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: All transactions retrieved
 */
router.get('/all/:id', transaction.getAllTransaction);

/**
 * @swagger
 * /transaction/{id}:
 *   put:
 *     summary: Update a transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaction updated
 */
router.put('/:id', transaction.updateTransaction);

/**
 * @swagger
 * /transaction:
 *   delete:
 *     summary: Delete a transaction
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted
 */
router.delete('/', transaction.deleteTransaction);

export default router;

