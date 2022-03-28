const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories using find all sequelize method
  Category.findAll({
    // specify what attributes you want to get from this model
    attributes:[
      'id',
      'category_name'
    ],
    // includes its associated Products
    include: [
      {
        // thee model we are including 
        model: Product,
        // what we want to include from this model
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  // the sesponse promise passing in category info that was just aquired and gioven aarbitrary name dbcategorydata
  .then(dbCategoryData => res.json(dbCategoryData))
  // pass in error information if not successfull 
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
// route to display a category by its id
router.get('/:id', (req, res) => {
  // finds one category by its `id` value
  Category.findOne({
    // specify what Category we are looking fore 
    where:{
      // this grabs the id from the url
      id: req.params.id
    },
    // the attributes we want to display from the categoryin array form
    attributes:[
      'id',
      'category_name',
    ],
    // include its associated Products in array form
    include:[
      // specify what model we are including from
      {
        model:Product,
        attributes:['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  // passs in the category data to promise
  .then(dbCategoryData => {
    // respons with an error if user puts an invalid id
    if(!dbCategoryData){
      res.status(404).json({message: 'No category found with this id'});
      return;
    }
    // respons with category data in jason form
    res.json(dbCategoryData);
  })
  // error handleing passes the error data and presents it in json
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

// route to create a new category
router.post('/categories', (req, res) => {
  // create a new category
  Category.create({
    // access json data from client side
    category_name: req.body.category_name
  })
  // pass in our newly gathered data in to the promise and respond with it as json
  .then(newCategoryData => res.json(newCategoryData))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

// route to update a category 
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      // what we are updating
      category_name: req.params,
    },
    {
      // this gets us the category specified
      where:{
        // this gets us the id frrom the browser 
        id: req.params.id
      }
    }
  )
  // passingt the category data to the promise
  .then(categoryUpdateData => {
    // sends message response if invalid id is passed
    if(!categoryUpdateData){
      res.status(404).json({message: 'No category found for this ID'});
      return;
    }
    // ending the promise with a response
    res.json(categoryUpdateData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

// route to delete a category
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(categoryDeleteData => {
    if(!categoryDeleteData){
      res.status(404).json({message: 'No category found for this ID'});
      return;
    }
    res.json(categoryDeleteData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })

});

module.exports = router;
