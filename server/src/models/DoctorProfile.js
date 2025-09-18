const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema(
  {
    dayOfWeek: { type: Number, min: 0, max: 6, required: true },
    slots: [{ type: String, required: true }],
  },
  { _id: false }
);

const DoctorProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    specialty: { type: String, required: true },
    bio: { type: String },
    clinicName: { type: String },
    location: { type: String },
    fee: { type: Number, default: 0 },
    availability: [AvailabilitySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('DoctorProfile', DoctorProfileSchema);


