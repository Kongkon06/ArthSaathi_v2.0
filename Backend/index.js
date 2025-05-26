import express from 'express';
import userRoutes from './controller/userController.js';
import accountRoutes from './controller/accountController.js';
import transactionRoutes from './controller/transactionController.js';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const App = express();
App.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ArthSaathi_v2 API',
      version: '1.0.0',
      description: 'API for user, account, and transaction management',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./controller/*.js'], // Path to your route/controller files with Swagger comments
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI route
App.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
App.get('/', (req, res) => {
  res.json('Hi there');
});
App.use('/user', userRoutes);
App.use('/accounts', accountRoutes);
App.use('/transaction', transactionRoutes);

App.listen(3000, () => console.log('Server is online'));

