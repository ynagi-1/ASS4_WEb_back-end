const express = require('express');
const router = express.Router();
const {
  getAllLots,
  getLotById,
  createLot,
  updateLot,
  deleteLot
} = require('../controllers/lotController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

router.get('/', getAllLots);
router.get('/:id', getLotById);
router.post('/', authenticate, authorizeAdmin, createLot);
router.put('/:id', authenticate, authorizeAdmin, updateLot);
router.delete('/:id', authenticate, authorizeAdmin, deleteLot);

module.exports = router;