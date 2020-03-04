const mongoose = require('mongoose');

const image = 'https://robohash.org/default_image?set=set4';

const employeeSchema = mongoose.Schema({
    full_name: String,
    email: { type: String, lowercase: true, unique: true },
    phone_num: { type: String, unique: true },
    address: String,
    position: String,
    salary: Number,
    image: { type: String, require: true, default: image },
    status: { type: String, default: 'Employment contract' }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Employee = module.exports = mongoose.model('Employee', employeeSchema);
module.exports.get = (callback, limit) => {
    Employee.find(callback).limit(limit);
};