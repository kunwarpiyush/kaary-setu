const mongoose = require('mongoose');

const jobDetailSchema = new mongoose.Schema({
	title: { type: String, required: true },
	jobTime: { type: String, required: true },
	salary: { type: String },
	location: { type: String, required: true },
	description: { type: String },
	contact: { type: String, required: true },
	employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('JobDetail', jobDetailSchema);