// import express router
const router = require('express').Router();

// import models
const { Category, Product } = require('../../models');

// get all Categories
router.get('/', async (req, res) => {
  try {
    const result = await Category.findAll({

      // include Products associated with these Categories
      include: [{ model: Product }]
    });

    res.status(200).json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// get a Category
router.get('/:id', async (req, res) => {
  try {

    // does Category exist?
    const result = await Category.findByPk(req.params.id, {

      // include Products associated with this Category
      include: [{ model: Product }]
    });

    // if Category does not exist, send failure message back and do nothing else
    if (!result) {
      res.status(404).json({ message: "No category found with that ID!" });
      return;
    }

    res.status(200).json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// create a new Category
router.post('/', async (req, res) => {
  try {
    const result = await Category.create(req.body);
    res.status(200).json({ status: "success", result });
  }
  catch (err) {
    res.status(500).json({ status: "error", result: err.message });
  }
});

// update an existing Category
router.put('/:id', async (req, res) => {
  try {

    // does Category exist?
    const category = await Category.findByPk(req.params.id);

    // if Category does not exist, send failure message back and do nothing else
    if (!category) {
      res.status(404).json({ result: `PUT failed - no category found with ID ${req.params.id}!` });
      return;
    }

    // update selected Category
    const result = await category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    res.status(200).json({ status: "success", result });
  }
  catch (err) {
    res.status(500).json({ status: "error", result: err.message });
  }
});

// delete Category
router.delete('/:id', async (req, res) => {
  try {

    // does Category exist?
    const category = await Category.findByPk(req.params.id);

    // if Category does not exist, send failure message back and do nothing else
    if (!category) {
      res.status(404).json({ result: `DELETE failed - no category found with ID ${req.params.id}!` });
      return;
    }

    // delete Category
    await category.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json({ status: "success", result: `Deleted category with ID ${req.params.id}.` });
  }
  catch (err) {
    res.status(500).json({ status: "error", result: err.message });
  }
});

module.exports = router;
