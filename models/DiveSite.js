const mongoose = require('mongoose');

const DiveSiteSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  lng: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('DiveSite', DiveSiteSchema);
