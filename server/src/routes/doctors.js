const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const DoctorProfile = require('../models/DoctorProfile');

const router = express.Router();

// Create or update doctor profile
router.post(
  '/me',
  auth(['doctor']),
  [body('specialty').notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const update = { ...req.body, user: req.user.id };
      const profile = await DoctorProfile.findOneAndUpdate(
        { user: req.user.id },
        update,
        { upsert: true, new: true }
      );
      res.json(profile);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get my doctor profile
router.get('/me', auth(['doctor']), async (req, res) => {
  try {
    const profile = await DoctorProfile.findOne({ user: req.user.id });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Public: list/search doctors
router.get('/', async (req, res) => {
  const { q, specialty } = req.query;
  const filter = {};
  if (specialty) filter.specialty = new RegExp(`^${specialty}$`, 'i');
  if (q) filter.$or = [
    { specialty: new RegExp(q, 'i') },
    { clinicName: new RegExp(q, 'i') },
    { location: new RegExp(q, 'i') },
  ];
  try {
    const docs = await DoctorProfile.find(filter).populate('user', 'name');
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


