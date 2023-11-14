// require necessary node modules
const express = require('express');
const routes = require('./routes');
const sequelize = require("./config/connection");

// set up express
const app = express();
const PORT = process.env.PORT || 3001;

// further setup of express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// look in routes folder for index.js, use routes found there
app.use(routes);

// sync sequelize models to the database - do not erase database and start fresh - then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});
