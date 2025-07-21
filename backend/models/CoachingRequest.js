const mongoose = require('mongoose');

const CoachingRequestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },        // formato: 'YYYY-MM-DD'
  time: { type: String, required: true },        // formato: 'HH:mm'
  duration: { type: Number, required: true },    // en minutos (60-120)

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  status: {
    type: String,
    enum: ['pending', 'approved', 'done'],
    default: 'pending'
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CoachingRequest', CoachingRequestSchema);