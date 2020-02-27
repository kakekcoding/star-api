const mongoose = require('mongoose');

// const image = 'https://robohash.org/default_image?set=set4';

const jobApplicantSchema = mongoose.Schema({
	full_name: { type: String },
	age: { type: Number },
	email: { type: String, lowercase: true, unique: true },
	phone_num: { type: String, unique: true },
	address: { type: String },
	served: { type: String },
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
};