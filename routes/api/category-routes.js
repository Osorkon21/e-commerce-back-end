const router = require('express').Router();
const { Category, Product } = require('../../models');

// ### Fill Out the API Routes to Perform RESTful CRUD Operations

// Fill out the unfinished routes in `product-routes.js`, `tag-routes.js`, and`category-routes.js` to perform create, read, update, and delete operations using your Sequelize models.

//   Note that the functionality for creating the many - to - many relationship for products has already been completed for you.

// > ** Hint **: Be sure to look at the mini - project code for syntax help and use your model's column definitions to figure out what `req.body` will be for POST and PUT routes!

// The `/api/categories` endpoint

// Category model
// id: {
//   type: DataTypes.INTEGER,
//     allowNull: false,
//       primaryKey: true,
//         autoIncrement: true
// },
// category_name: {
//   type: DataTypes.STRING,
//     allowNull: false
// }

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });

    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with that ID!" });
      return;
    }

    res.status(200).json(categoryData);
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

// Create a new record
// router.post('/', async (req, res) => {
//   try {
//     const payload = await Model.create(req.body);
//     res.status(200).json({ status: "success", payload })
//   } catch (err) {
//     res.status(500).json({ status: "error", payload: err.message })
//   }
// })

// GET a single driver
// router.get('/:id', async (req, res) => {
//   try {
//     const driverData = await Driver.findByPk(req.params.id, {
//       include: [{ model: License }, { model: Car }],
//     });

//     if (!driverData) {
//       res.status(404).json({ message: 'No driver found with that id!' });
//       return;
//     }

//     res.status(200).json(driverData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// GET all drivers
// router.get('/', async (req, res) => {
//   try {
//     const driverData = await Driver.findAll({
//       include: [{ model: License }, { model: Car }],
//     });
//     res.status(200).json(driverData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Get all records
// router.get('/', async (req, res) => {
//   try {
//     console.log(req)
//     const payload = await Model.findAll();
//     res.status(200).json({ status: "success", payload: payload })
//   } catch (err) {
//     res.status(500).json({ status: "error", payload: err.message })
//   }
// })

// Get one record by pk
// router.get('/:id', async (req, res) => {
//   try {
//     const payload = await Model.findByPk(req.params.id);
//     res.status(200).json({ status: "success", payload })
//   } catch (err) {
//     res.status(500).json({ status: "error", payload: err.message })
//   }
// })

// Delete a record
router.delete('/:id', async (req, res) => {
  try {
    const payload = await Model.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ status: "success" })
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message })
  }
})

// Get all records
// router.get('/', async (req, res) => {
//   try {
//     console.log(req)
//     const payload = await Model.findAll();
//     res.status(200).json({ status: "success", payload: payload })
//   } catch (err) {
//     res.status(500).json({ status: "error", payload: err.message })
//   }
// })

// Create a new record
// router.post('/', async (req, res) => {
//   try {

//     const payload = await Model.create(req.body);
//     res.status(200).json({ status: "success", payload })
//   } catch (err) {
//     res.status(500).json({ status: "error", payload: err.message })
//   }
// })

// Get one record by pk
// router.get('/:id', async (req, res) => {
//   try {
//     const payload = await Model.findByPk(req.params.id);
//     res.status(200).json({ status: "success", payload })
//   } catch (err) {
//     res.status(500).json({ status: "error", payload: err.message })
//   }
// })


// Delete a record
router.delete('/:id', async (req, res) => {
  try {
    const payload = await Model.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ status: "success" })
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message })
  }
})

// router.get('/', async (req, res) => {
//   try {
//     // console.log(req.body)
//     const payload = await Trips.findAll();
//     res.status(200).json({ status: "success", payload: payload })
//   } catch (err) {
//     res.status(500).json({ status: "error", payload: err.message })
//   }
// });

// Create a new record
router.post('/', async (req, res) => {

  console.log(req.body);

  try {
    const payload = await Trips.create(req.body, { fields: ["trip_budget", "traveller_amount", "traveller_id", "location_id"] });
    res.status(200).json({ status: "success", payload })
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message })
  }
});

// Delete a record
router.delete('/:id', async (req, res) => {
  try {
    const payload = await Trips.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ status: "success" })
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message })
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
