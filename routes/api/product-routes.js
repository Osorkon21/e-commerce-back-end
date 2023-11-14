// import express router
const router = require('express').Router();

// import models
const { Product, Category, Tag, ProductTag } = require('../../models');

// get all products
router.get('/', async (req, res) => {
  try {
    const result = await Product.findAll({

      // include Categories and Tags associated with these Products
      include: [{
        model: Category
      },
      {
        model: Tag,
        through: {
          attributes: ["id", "product_id", "tag_id"]
        },
        as: "my_tag"
      }]
    });

    res.status(200).json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// get a product
router.get('/:id', async (req, res) => {
  try {
    const result = await Product.findByPk(req.params.id, {

      // include Categories and Tags associated with this Product
      include: [{
        model: Category
      },
      {
        model: Tag,
        through: {
          attributes: ["id", "product_id", "tag_id"]
        },
        as: "my_tag"
      }]
    });

    if (!result) {
      res.status(404).json({ message: "No product found with that ID!" });
      return;
    }

    res.status(200).json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a product
router.delete('/:id', async (req, res) => {
  try {

    // does product exist?
    const product = await Product.findByPk(req.params.id);

    // if product not found, send failure message back and do nothing else
    if (!product) {
      res.status(404).json({ result: `DELETE failed - no product found with ID ${req.params.id}!` });
      return;
    }

    // delete product by ID
    await product.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json({ status: "success", result: `Deleted product with ID ${req.params.id}.` });
  }
  catch (err) {
    res.status(500).json({ status: "error", result: err.message });
  }
});

module.exports = router;
