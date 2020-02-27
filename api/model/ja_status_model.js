const mongoose = require('mongoose');

const jobApplicantStatusSchema = mongoose.Schema({
	status: String
}, {
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

const JobApplicantStatus = module.exports = mongoose.model('JobApplicantStatus', jobApplicantStatusSchema);
module.exports.get = (callback, limit) => {
	JobApplicantStatus.find(callback).limit(limit);
}; 