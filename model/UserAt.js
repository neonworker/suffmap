let mongoose = require('mongoose');


let UserAtSchema = mongoose.Schema({
	user:{
		type: Schema.Types.ObjectId, 
		ref: 'User'
	},
	location:{
		type: Schema.Types.ObjectId, 
		ref: 'Location'
	},

	time:{
		type: Date,
		required: true
	}
});

let UserAt = module.exports = mongoose.model('UserAt', UserAtSchema);