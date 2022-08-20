const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({
      include: [{model: Product}],
    });
    
    res.status(200).json(tags);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    
    res.status(200).json(tag);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(newTag => {
    res.status(200).json(newTag);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(updatedTag => {
      res.status(200).json(updatedTag);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(destroyedTag => {
    res.status(200).json(destroyedTag);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;
