const mongoose = require('mongoose');

// const image = 'https://robohash.org/default_image?set=set4';

const jobApplicantSchema = mongoose.Schema({
    full_name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    phone_num: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    served: { type: String, required: true },
    image: { type: String, require: true }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const JobApplicant = module.exports = mongoose.model('JobApplicant', jobApplicantSchema);
module.exports.get = (callback, limit) => {
    JobApplicant.find(callback).limit(limit);
}