import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: DataTypes.STRING,
  marca: DataTypes.STRING,
  precio: DataTypes.FLOAT,
  categoria: DataTypes.STRING,
  codigo_barra: DataTypes.STRING,
  tipo: DataTypes.STRING,
  atributos: DataTypes.JSON,
  imagen: DataTypes.STRING
}, {
  tableName: "Products",
  timestamps: true
});

export default Product;