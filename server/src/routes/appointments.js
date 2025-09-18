const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');
const DoctorProfile = require('../models/DoctorProfile');

const router = express.Router();

// Create appointment (patient)
router.post(
  '/',
  auth(['patient']),
  [body('doctorId').notEmpty(), body('date').isISO8601(), body('slot').notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { doctorId, date, slot, notes } = req.body;
    try {
      const profile = await DoctorProfile.findOne({ user: doctorId });
      if (!profile) return res.status(404).json({ message: 'Doctor not found' });
      const appt = await Appointment.create({
        patient: req.user.id,
        doctor: doctorId,
        doctorProfile: profile._id,
        date: new Date(date),
        slot,
        notes,
      });
      res.status(201).json(appt);
    } catch (err) {
      if (err.code === 11000) return res.status(409).json({ message: 'Slot already booked' });
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// List my appointments (patient)
router.get('/me', auth(['patient']), async (req, res) => {
  try {
    const list = await Appointment.find({ patient: req.user.id })
      .populate('doctor', 'name')
      .sort({ date: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// List doctor's upcoming appointments (doctor)
router.get('/doctor/me', auth(['doctor']), async (req, res) => {
  try {
    const list = await Appointment.find({ doctor: req.user.id, status: 'booked' })
      .populate('patient', 'name')
      .sort({ date: 1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel appointment (patient or doctor owning it)
router.post('/:id/cancel', auth(['patient', 'doctor']), async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ message: 'Not found' });
    if (req.user.role === 'patient' && appt.patient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    if (req.user.role === 'doctor' && appt.doctor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    appt.status = 'cancelled';
    await appt.save();
    res.json(appt);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


