const router = require('express').Router();
const { where } = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // includes associated Products
  try {
    const categoryData = await Category.findAll({
      include: { 
        model: Product
       }
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by `id` value
  // includes associated Products
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: { 
        model: Product
       }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No categories found with this ID' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // creates a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
    console.log('New cateogry added')
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // updates a category by `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No categories found with this ID' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // deletes a category by `id` value
  try {
    const categoryData = await Category.destroy(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No categories found with this ID' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
