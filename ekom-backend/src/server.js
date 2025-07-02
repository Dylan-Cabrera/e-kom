import dotenv from 'dotenv';
dotenv.config();
import sequelize from './config/db.js';
import './models/index.js'; // Importa TODAS las asociaciones
import app from './app.js';

const PORT = process.env.PORT || 4000;

(async () => {
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();