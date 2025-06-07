import express from "express";
import account from '../model/accountModel.js';

const router = express.Router();


/**
 * @swagger
 * /accounts/create:
 *   post:
 *     summary: Create a new account
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               age:
 *                 type: number
 *               dependents:
 *                 type: number
 *               initialBalance:
 *                 type: number
 *               accountType:
 *                 type: string
 *               monthlyIncome:
 *                 type: number
 *               disposableIncome:
 *                 type: number
 *               desiredSavings:
 *                 type: number
 *     responses:
 *       201:
 *         description: Account created
 */

router.post('/create', account.createAccount);

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Get account by ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account retrieved
 */
router.get('/', account.getAccount);

/**
 * @swagger
 * /accounts:
 *   delete:
 *     summary: Delete an account
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
 *         description: Account deleted
 */
router.delete('/:id', account.deleteAccount);

/**
 * @swagger
 * /accounts/update/{id}:
 *   put:
 *     summary: Update an account
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
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               age:
 *                 type: number
 *               dependents:
 *                 type: number
 *               initialBalance:
 *                 type: number
 *               accountType:
 *                 type: string
 *               monthlyIncome:
 *                 type: number
 *               disposableIncome:
 *                 type: number
 *               desiredSavings:
 *                 type: number
 *     responses:
 *       200:
 *         description: Account updated
 */
router.put('/update/:id', account.updateAccount);

export default router;

