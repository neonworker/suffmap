let mongoose = require('mongoose');


let SpecialOfferSchema = mongoose.Schema({
	location:{
		type: ObjectId, 
		ref: 'Location',
		required: true
	},
	owner:{
		type: ObjectId,
		ref: 'User',
		required: true
	},
	description_de:{
		type: String,
		required: true,
		max: 2000
	},
	description_en:{
		type: String,
		required: true,
		max: 2000
	},
	title_de:{
		type: String,
		required: true,
		max: 100
	},
	title_en:{
		type: String,
		required: true,
		max: 100
	},
	code:{
		type: String,
		required: true,
		max: 15
	},
	pictures:[{
		type: ObjectId,
		default: undefined,
		ref: 'Picture'
	}]
},
{
	timestamps: true
});

let SpecialOffer = module.exports = mongoose.model('SpecialOffer', SpecialOfferSchema);