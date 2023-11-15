// import express router
const router = require('express').Router();

// import models
const { Tag, Product } = require('../../models');

// get all Tags
router.get('/', async (req, res) => {
  try {
    const result = await Tag.findAll({

      // include Products associated with these Tags
      include: [{
        model: Product,
        through: {
          attributes: ["id", "product_id", "tag_id"]
        },
        as: "my_product"
      }]
    });

    res.status(200).json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// get a Tag
router.get('/:id', async (req, res) => {
  try {

    // does Tag exist?
    const result = await Tag.findByPk(req.params.id, {

      // include Products associated with this Tag
      include: [{
        model: Product,
        through: {
          attributes: ["id", "product_id", "tag_id"]
        },
        as: "my_product"
      }]
    });

    // if Tag does not exist, send failure message back and do nothing else
    if (!result) {
      res.status(404).json({ message: "No tag found with that ID!" });
      return;
    }

    res.status(200).json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// create new Tag
router.post('/', async (req, res) => {
  try {
    const result = await Tag.create(req.body);
    res.status(200).json({ status: "success", result });
  }
  catch (err) {
    res.status(500).json({ status: "error", result: err.message });
  }
});

// update existing Tag
router.put('/:id', async (req, res) => {
  try {

    // does Tag exist?
    const tag = await Tag.findByPk(req.params.id);

    // if Tag does not exist, send failure message back and do nothing else
    if (!tag) {
      res.status(404).json({ result: `PUT failed - no tag found with ID ${req.params.id}!` });
      return;
    }

    // update Tag
    const result = await tag.update(
      {
        tag_name: req.body.tag_name
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

// delete a Tag
router.delete('/:id', async (req, res) => {
  try {

    // does Tag exist?
    const tag = await Tag.findByPk(req.params.id);

    // if Tag does not exist, send failure message back and do nothing else
    if (!tag) {
      res.status(404).json({ result: `DELETE failed - no tag found with ID ${req.params.id}!` });
      return;
    }

    // delete Tag
    await tag.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json({ status: "success", result: `Deleted tag with ID ${req.params.id}.` });
  }
  catch (err) {
    res.status(500).json({ status: "error", result: err.message });
  }
});

module.exports = router;
