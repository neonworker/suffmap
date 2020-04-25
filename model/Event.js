let mongoose = require('mongoose');


let EventSchema = mongoose.Schema({
	id_event:{
		type: Number,
		required: true
	},
	title:{
		type: String,
		required: true,
		max: 150
	},
	date:{
		type: Date,
		required: true
	},
	location:{
		type: Schema.Types.ObjectId, 
		ref: 'Location'
	},

});

let Event = module.exports = mongoose.model('Event', EventSchema);