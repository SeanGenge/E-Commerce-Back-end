const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll({
      include: [{model: Product}],
    });
    
    res.status(200).json(categories);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    
    res.status(200).json(category);
  }
  catch(err) {
    res.status(404).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(newCategory => {
    res.status(200).json(newCategory);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
  {
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(updatedCategory => {
    res.status(200).json(updatedCategory);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(destroyedCategory => {
    res.status(200).json(destroyedCategory);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;
