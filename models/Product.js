const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Product extends Model { }

// initialize Product Model
Product.init(
  {
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
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {

        // ensure price is a decimal
        isDecimal: true
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,

      // set default value to 10
      defaultValue: 10,

      validate: {

        // ensure stock is a number
        isNumeric: true
      }
    },

    // add foreign Category key
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Product',
  }
);

module.exports = Product;
