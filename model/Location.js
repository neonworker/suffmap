let mongoose = require('mongoose');


let LocationSchema= mongoose.Schema({
	id_location:{
		type: Number,
		required: true
	},
	name:{
		type: String,
		required: true,
		max: 100
	},
	street:{
		type: String,
		required: true,
		max: 100
	},
	zip:{
		type: Number,
		required: true,
	},
	city:{
		type: String,
		required: true,
		max: 100
	},	
	country:{
		type: String,
		required: true,
		max: 100
	},
	lcoord:{
		type: Number,
		required: true,
	},
	bcoord:{
		type: Number,
		required: true,
	},
});

let Location = module.exports = mongoose.model('Location', LocationSchema);