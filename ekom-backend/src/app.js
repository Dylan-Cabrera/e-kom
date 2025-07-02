import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import productsRouter from './routes/products.router.js';
import storesRouter from './routes/stores.router.js';
import sequelize from './config/db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', productsRouter);
app.use('/stores', storesRouter);

app.get('/', (req, res) => res.send('E-kom API'));

const PORT = process.env.PORT || 4000;

(async () => {
    await sequelize.authenticate()
    console.log("Se conecto a la base de datos")
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();