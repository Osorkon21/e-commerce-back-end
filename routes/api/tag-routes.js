const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const result = await Tag.findAll({
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

router.get('/:id', async (req, res) => {
  try {
    const result = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: {
          attributes: ["id", "product_id", "tag_id"]
        },
        as: "my_product"
      }]
    });

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

router.post('/', async (req, res) => {
  try {
    const result = await Tag.create(req.body);
    res.status(200).json({ status: "success", result });
  }
  catch (err) {
    res.status(500).json({ status: "error", result: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
      res.status(404).json({ result: `PUT failed - no tag found with ID ${req.params.id}!` });
      return;
    }

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

router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
      res.status(404).json({ result: `DELETE failed - no tag found with ID ${req.params.id}!` });
      return;
    }

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
