const mongoose = require('mongoose');

const DiveSchema = new mongoose.Schema(
    {
        startedAt: {
            type: Date,
            default: Date.now
        },
        endedAt: {
            type: Date,
            default: Date.now
        },
        diveTimeMins: {
            type: Number,
            min: [0, 'Dive time cannot be less than 0 mins'],
            max: [200, 'Dive time cannot exceed 200 mins']
        },
        siteName: {
            type: String,
            maxlength: [100, "Dive site name cannot exceed 100 characters"]
        },
        psiStart: {
            type: Number,
            min: [0, 'Starting tank pressure cannot be less than 0 psi'],
            max: [4000, 'Starting tank pressure cannot exceed 4000 psi']
        },
        psiEnd: {
            type: Number,
            min: [0, 'Ending tank pressure cannot be less than 0 psi'],
            max: [4000, 'Ending tank pressure cannot exceed 4000 psi']
        },
        suitType: {
            type: String,
            enum: [
                "swimsuit",
                "dive skin",
                "shorty",
                "3mm wetsuit",
                "5mm wetsuit",
                "7mm wetsuit",
                "semi-dry wetsuit",
                "dry suit"
            ],
            default: '3mm wetsuit'
        },
        weightsUsed: {
            type: Number,
            min: [0, "Weight used cannot be less than 0 lbs"],
            max: [50, "Wheight used cannot exceed 50 lbs"]
        },
        diveType: {
            type: String,
            enum: [
                "boat",
                "shore",
                "liveaboard"
            ],
            default: 'boat'
        },
        waterConditions: {
            type: String,
            enum: [
                "current",
                "surge",
                "calm"
            ],
            default: "calm"
        },
        waterType: {
            type: String,
            enum: [
                "fresh",
                "salt",
                "brackish"
            ],
            default: "salt"
        },
        waterTemp: {
            type: Number,
            min: [32, "Water temp must be at least 0 degrees F"],
            max: [100, "Water temp cannot exceed 100 degrees F"],
            default: 75
        },
        airTemp: {
            type: Number,
            min: [-30, "Air temp must be at least -30 degrees F"],
            max: [150, "Air temp cannot exceed 150 degrees F"],
            default: 75
        },
        visibility: {
            type: Number,
            min: [0, "Visibility cannot be less than 0 ft"],
            max: [300, "Visibility cannot exceed 300 ft"],
        },
        diveComputer: {
            type: String,
            enum: [
                "console",
                "wrist",
                "watch"
            ],
            default: "console"
        },
        gasType: {
            type: String,
            enum: [
                "air",
                "nitrox",
                "trimix",
                "heliox"
            ],
            default: "air"
        },
        maxDepth: {
            type: Number,
            min: [0, "Max depth must be greater than 0 ft"],
            max: [0, "Max depth cannot exceed 350 ft"],
        },
        lat: {
            type: Number,
            min: [-90, "Latitude must be greater than -90 degrees"],
            max: [90, "Latitude cannot exceed 90 degrees"]
        },
        long: {
            type: Number,
            min: [-180, "Longitude must be greater than -180 degrees"],
            max: [180, "Longitude cannot exceed 180 degrees"]
        },
        notes: {
            type: String,
            maxlength: [280, "Notes cannot exceed 280 characters"]
        }
    }
);

// Calculate diveTimeMins from startedAt and endedAt
DiveSchema.pre('save', function (next) {
    this.diveTimeMins = (this.endedAt - this.startedAt) / (1000 * 60);
    next();
})

module.exports = mongoose.model('Dive', DiveSchema);

