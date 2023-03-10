import mongoose from 'mongoose';

const stressTrackingSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  userId: {
    type: String,
    ref: 'User'
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  stressLevel: {
    type: Number,
    require: true,
    default: 0
  },
  imageUrl: {
    type: String
  },
}, { timestamps: true });

export const StressTrackingModel = mongoose.model('StressTracking', stressTrackingSchema);