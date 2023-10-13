import { Router } from 'express';

export const userRouter = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */
userRouter.get('/users', (req, res) => {
  // ここでユーザーのリストを返す処理を実装
  res.json([{ id: 1, name: 'John Doe' }]);
});
