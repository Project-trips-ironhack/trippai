const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: String,
    country: String,
    socket: String,
    currency: String,
    language: String,
    position: {
        lat: Number,
        lon: Number
    },
    description: String,
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const City = mongoose.model('City', citySchema);
module.exports = City;
