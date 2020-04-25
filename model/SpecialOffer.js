let mongoose = require('mongoose');


let SpecialOfferSchema = mongoose.Schema({
	id_offer:{
		type: Number,
		required: true
	},
	location:{
		type: Schema.Types.ObjectId, 
		ref: 'Location'
	},
	desc_de:{
		type: String,
		required: true,
		max: 200
	},
	desc_en:{
		type: String,
		required: true,
		max: 200
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
});

let SpecialOffer = module.exports = mongoose.model('SpecialOffer', SpecialOfferSchema);