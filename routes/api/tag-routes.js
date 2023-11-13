const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// ### Fill Out the API Routes to Perform RESTful CRUD Operations

// Fill out the unfinished routes in `product-routes.js`, `tag-routes.js`, and`category-routes.js` to perform create, read, update, and delete operations using your Sequelize models.

//   Note that the functionality for creating the many - to - many relationship for products has already been completed for you.

// > ** Hint **: Be sure to look at the mini - project code for syntax help and use your model's column definitions to figure out what `req.body` will be for POST and PUT routes!

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

// Delete a record
// router.delete('/:id', async (req, res) => {
//   try {
//     const payload = await Model.destroy({
//       where: {
//         id: req.params.id
//       }
//     });
//     res.status(200).json({ status: "success" })
//   } catch (err) {
//     res.status(500).json({ status: "error", payload: err.message })
//   }
// })

// Updates book based on its isbn
// router.put('/:isbn', (req, res) => {
//   // Calls the update method on the Book model
//   Book.update(
//     {
//       // All the fields you can update and the data attached to the request body.
//       title: req.body.title,
//       author: req.body.author,
//       isbn: req.body.isbn,
//       pages: req.body.pages,
//       edition: req.body.edition,
//       is_paperback: req.body.is_paperback,
//     },
//     {
//       // Gets the books based on the isbn given in the request parameters
//       where: {
//         isbn: req.params.isbn,
//       },
//     }
//   )
//     .then((updatedBook) => {
//       // Sends the updated book as a json response
//       res.json(updatedBook);
//     })
//     .catch((err) => res.json(err));
// });

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
// router.post('/', async (req, res) => {

//   console.log(req.body);

//   try {
//     const payload = await Trips.create(req.body, { fields: ["trip_budget", "traveller_amount", "traveller_id", "location_id"] });
//     res.status(200).json({ status: "success", payload })
//   } catch (err) {
//     res.status(500).json({ status: "error", payload: err.message })
//   }
// });

module.exports = router;
