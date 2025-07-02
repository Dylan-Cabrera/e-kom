import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Store = sequelize.define('Store', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: DataTypes.STRING,
  direccion: DataTypes.STRING
}, {
  tableName: "Stores",
  timestamps: true
});

export default Store;