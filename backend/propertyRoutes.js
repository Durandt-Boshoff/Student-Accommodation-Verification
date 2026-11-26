const express = require('express');
const router = express.Router();
const {
  getAllProperties,
  getPropertyById,
  createProperty
} = require('./propertyController');

router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.post('/', createProperty);

module.exports = router;