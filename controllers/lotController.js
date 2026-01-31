const Lot = require('../models/Lot');

const getAllLots = async (req, res) => {
  try {
    const { status, category, sort } = req.query;
    
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (category) {
      query.category = category;
    }

    let sortOptions = { createdAt: -1 };
    
    if (sort === 'bid-asc') {
      sortOptions = { currentBid: 1 };
    } else if (sort === 'bid-desc') {
      sortOptions = { currentBid: -1 };
    } else if (sort === 'title') {
      sortOptions = { title: 1 };
    }

    const lots = await Lot.find(query)
      .populate('category', 'name slug')
      .populate('createdBy', 'email name')
      .sort(sortOptions);

    res.json({
      success: true,
      count: lots.length,
      data: lots
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lots',
      error: error.message
    });
  }
};

const getLotById = async (req, res) => {
  try {
    const lot = await Lot.findById(req.params.id)
      .populate('category', 'name description slug')
      .populate('createdBy', 'email name');

    if (!lot) {
      return res.status(404).json({
        success: false,
        message: 'Lot not found'
      });
    }

    res.json({
      success: true,
      data: lot
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lot',
      error: error.message
    });
  }
};

const createLot = async (req, res) => {
  try {
    const { title, startBid, description, category, endDate, status } = req.body;

    const lotData = {
      title,
      startBid,
      description,
      createdBy: req.user._id
    };

    if (category) lotData.category = category;
    if (endDate) lotData.endDate = endDate;
    if (status) lotData.status = status;

    const lot = await Lot.create(lotData);

    await lot.populate('category', 'name slug');
    await lot.populate('createdBy', 'email name');

    res.status(201).json({
      success: true,
      message: 'Lot created successfully',
      data: lot
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating lot',
      error: error.message
    });
  }
};

const updateLot = async (req, res) => {
  try {
    const { title, startBid, currentBid, description, category, endDate, status } = req.body;

    let lot = await Lot.findById(req.params.id);

    if (!lot) {
      return res.status(404).json({
        success: false,
        message: 'Lot not found'
      });
    }

    if (title !== undefined) lot.title = title;
    if (startBid !== undefined) lot.startBid = startBid;
    if (currentBid !== undefined) lot.currentBid = currentBid;
    if (description !== undefined) lot.description = description;
    if (category !== undefined) lot.category = category;
    if (endDate !== undefined) lot.endDate = endDate;
    if (status !== undefined) lot.status = status;

    await lot.save();

    await lot.populate('category', 'name slug');
    await lot.populate('createdBy', 'email name');

    res.json({
      success: true,
      message: 'Lot updated successfully',
      data: lot
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating lot',
      error: error.message
    });
  }
};

const deleteLot = async (req, res) => {
  try {
    const lot = await Lot.findById(req.params.id);

    if (!lot) {
      return res.status(404).json({
        success: false,
        message: 'Lot not found'
      });
    }

    await lot.deleteOne();

    res.json({
      success: true,
      message: 'Lot deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting lot',
      error: error.message
    });
  }
};

module.exports = {
  getAllLots,
  getLotById,
  createLot,
  updateLot,
  deleteLot
};