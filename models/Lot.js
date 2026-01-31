const mongoose = require('mongoose');

const lotSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Lot title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters']
  },
  startBid: {
    type: Number,
    required: [true, 'Starting bid is required'],
    min: [0, 'Starting bid must be a positive number']
  },
  currentBid: {
    type: Number,
    default: function() {
      return this.startBid;
    }
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'pending'],
    default: 'active'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  endDate: {
    type: Date,
    required: false
  }
}, {
  timestamps: true
});

lotSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Lot', lotSchema);
