const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const daySchema = new Schema({
    breakfast: {
        place: String,
        address: String,
        position: {
            lat: Number,
            lon: Number
        },
        description: String,
    },
    morning: [{
        place: String,
        address: String,
        duration: {
            type: String,
            enum: ['30min-1hour', '1-2 hours', '2-3 hours', '3 or more hours']
        },
        position: {
            lat: Number,
            lon: Number
        },
        description: String
    }],
    lunch: {
        place: String,
        address: String,
        position: {
            lat: Number,
            lon: Number
        },
        description: String
    },
    afternoon: [{
        place: String,
        address: String,
        duration: {
            type: String,
            enum: ['30min-1hour', '1-2 hours', '2-3 hours', '3 or more hours']
        },
        position: {
            lat: Number,
            lon: Number
        },
        description: String
    }],
    dinner: {
        place: String,
        address: String,
        position: {
            lat: Number,
            lon: Number
        },
        description: String
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Day = mongoose.model('Day', daySchema);
module.exports = Day;