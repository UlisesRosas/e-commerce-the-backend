// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      // 10 numbers to the left of decimal and 2 numbers to the right
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validate:{
        // validates if its a number
        isDecimal: true
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      // validates if this is a number
      validate:{
        isNumeric: true,
      }
    },
    category_id:{
      type: DataTypes.INTEGER,
      // product model references the category model through its id which is its primary key
      references:{
        model: 'category',
        key: 'id'
      },
    }
  
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }

);

module.exports = Product;
