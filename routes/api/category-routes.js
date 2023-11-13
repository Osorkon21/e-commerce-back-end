const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const result = await Category.findAll({
      include: [{ model: Product }]
    });

    res.status(200).json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

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

router.post('/', async (req, res) => {
  try {
    const result = await Category.create(req.body);
    res.status(200).json({ status: "success", result });
  }
  catch (err) {
    res.status(500).json({ status: "error", result: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      res.status(404).json({ result: `PUT failed - no category found with ID ${req.params.id}!` });
      return;
    }

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

router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      res.status(404).json({ result: `DELETE failed - no category found with ID ${req.params.id}!` });
      return;
    }

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
