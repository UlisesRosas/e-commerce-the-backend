const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    attributes:[
      'id',
      'tag_name'
    ],
    // be sure to include its associated Product data
    include:[
      {
      model: Product,
      attributes: [
        'product_name',
        'price',
        'stock'
      ]
    },
    {
      model:Category,
      attributes:['category_name']
    }
    ]
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where:{
      id: req.params.id
    },
    attributes: ['id', 'tag_name'],
      // be sure to include its associated Product data

    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(singleTagData => {
    if(!singleTagData) {
      res.status(404).json({ message: 'No tag by this ID was found'});
      return;
    }
    // responds with single product if successful
    res.json(singleTagData);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err);
  })
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

module.exports = router;
