const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Product has only one Category
Product.belongsTo(Category, {
  foreignKey: "category_id"
});

// Category can have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
});

// Tags can have many Products
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: "my_tag"
});

// Products can have many Tags
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: "my_product"
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
