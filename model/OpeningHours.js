let mongoose = require('mongoose');


let OpeningHoursSchema = mongoose.Schema({
	day:{
		type: String,
		required: true,
		max: 20
	},
	location:{
		type: Schema.Types.ObjectId, 
		ref: 'Location'
	},
	from:{
		type: Date, 
		default: Date.now,
		required: true
	},
	to:{
		type: Date,
		required: true
	}
});

let OpeningHours = module.exports = mongoose.model('OpeningHours', OpeningHoursSchema);