import express from "express";
import account from '../model/accountModel.js';

const router = express.Router();


/**
 * @swagger
 * /accounts/create:
 *   post:
 *     summary: Create a new account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               age:
 *                 type: number
 *               dependents:
 *                 type: number
 *               inttialBalance:
 *                 type: number
 *               accountType:
 *                 type: string
 *               monthlyIncome:
 *                 type: number
 *               disposableIncome:
 *                 type: number
 *               desiredSaving:
 *                 type: number
 *     responses:
 *       201:
 *         description: Account created
 */

router.post('/create', account.createAccount);

/**
 * @swagger
 * /accounts/{id}:
 *   get:
 *     summary: Get account by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account retrieved
 */
router.get('/:id', account.getAccount);

/**
 * @swagger
 * /accounts:
 *   delete:
 *     summary: Delete an accouD
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

export default router;

