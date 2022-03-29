const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection.js')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
// only force false if you need to add a new table
sequelize.sync({force: false}).then(() =>{

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
})
