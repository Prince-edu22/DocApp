const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'DoctorProfile' },
    date: { type: Date, required: true },
    slot: { type: String, required: true },
    status: { type: String, enum: ['booked', 'cancelled', 'completed'], default: 'booked' },
    notes: { type: String },
  },
  { timestamps: true }
);

AppointmentSchema.index({ doctor: 1, date: 1, slot: 1 }, { unique: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);


