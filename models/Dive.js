const mongoose = require('mongoose');

const DiveSchema = new mongoose.Schema({
  date: {
    type: String,
    default: `1900-12-12`,
    required: true,
  },
  timeIn: {
    type: Number,
    min: [0, 'time in cannot be less than 0000'],
    max: [2359, 'time in cannot be more than 2359'],
    required: true,
  },
  timeOut: {
    type: Number,
    min: [0, 'time in cannot be less than 0000'],
    max: [2359, 'time in cannot be more than 2359'],
    required: true,
  },
  diveDuration: {
    type: Number,
    min: [0, 'Dive time cannot be less than 0 mins'],
    max: [300, 'Dive time cannot exceed 300 mins'],
  },
  diveSite: {
    type: String,
    maxlength: [100, 'Dive site name cannot exceed 100 characters'],
    required: true,
  },
  coords: {
    lat: {
      type: Number,
      min: [-90, 'Latitude must be greater than -90 degrees'],
      max: [90, 'Latitude cannot exceed 90 degrees'],
    },
    lng: {
      type: Number,
      min: [-180, 'Longitude must be greater than -180 degrees'],
      max: [180, 'Longitude cannot exceed 180 degrees'],
    },
  },
  psiIn: {
    type: Number,
    min: [0, 'Starting tank pressure cannot be less than 0 psi'],
    max: [4000, 'Starting tank pressure cannot exceed 4000 psi'],
  },
  psiOut: {
    type: Number,
    min: [0, 'Ending tank pressure cannot be less than 0 psi'],
    max: [4000, 'Ending tank pressure cannot exceed 4000 psi'],
  },
  gasType: {
    type: String,
    enum: ['air', 'nitrox', 'trimix', 'heliox'],
    default: 'air',
  },
  maxDepth: {
    type: Number,
    min: [0, 'Max depth must be greater than 0 ft'],
    max: [350, 'Max depth cannot exceed 350 ft'],
    required: true,
  },
  suitType: {
    type: String,
    enum: [
      'swimsuit',
      'dive skin',
      'shorty',
      '3mm wetsuit',
      '5mm wetsuit',
      '7mm wetsuit',
      'semi-dry wetsuit',
      'dry suit',
    ],
    default: '3mm wetsuit',
  },
  weightUsed: {
    type: Number,
    min: [0, 'Weight used cannot be less than 0 lbs'],
    max: [50, 'Weight used cannot exceed 50 lbs'],
  },
  diveComputer: {
    type: String,
    enum: ['console', 'wrist', 'watch'],
    default: 'console',
  },
  diveType: {
    type: String,
    enum: ['boat', 'shore'],
    default: 'boat',
  },
  current: {
    type: String,
    enum: ['strong', 'moderate', 'gentle', 'none'],
    default: 'none',
  },
  waves: {
    type: String,
    enum: ['large', 'moderate', 'small', 'calm'],
    default: 'calm',
  },
  waterType: {
    type: String,
    enum: ['fresh', 'salt', 'brackish'],
    default: 'salt',
  },
  dayOrNight: {
    type: String,
    enum: ['Day', 'Night'],
    default: 'Day',
  },
  visibility: {
    type: Number,
    min: [0, 'Visibility cannot be less than 0 ft'],
    max: [300, 'Visibility cannot exceed 300 ft'],
  },
  waterTemp: {
    type: Number,
    min: [32, 'Water temp must be at least 0 degrees F'],
    max: [100, 'Water temp cannot exceed 100 degrees F'],
    default: 75,
  },
  buddy: {
    type: String,
    maxlength: [100, 'Dive buddy value cannot exceed 100 characters'],
  },
  notes: {
    type: String,
    maxlength: [280, 'Notes cannot exceed 280 characters'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Calculate diveDuration from timeIn and timeOut
DiveSchema.pre('save', function(next) {
  const inHour = Math.floor(this.timeIn / 100);
  const outHour = Math.floor(this.timeOut / 100);
  const inMins = this.timeIn % 100;
  const outMins = this.timeOut % 100;

  if (inHour === outHour) {
    this.diveDuration = outMins - inMins;
  } else if (inHour != outHour) {
    let divedMinutes = 0;
    divedMinutes += 60 - inMins + outMins;
    if (outHour - inHour === 2) {
      divedMinutes += 60;
    } else if (outHour - inHour === 3) {
      divedMinutes += 120;
    }
    this.diveDuration = divedMinutes;
  }
  next();
});

module.exports = mongoose.model('Dive', DiveSchema);
