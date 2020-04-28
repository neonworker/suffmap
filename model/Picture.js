let mongoose = require('mongoose');


let PictureSchema= mongoose.Schema({
	public: {
		type: Boolean,
		required: true,
		default: false
	},
	location:{
		type: Schema.Types.ObjectId, 
		ref: 'Location'
	},
	path:{
		type: String,
		required: true,
		max: 200
	},
	uploaded:{
		type: Date,
		required: true
	},
	title:{
		type: String,
		required: true,
		max: 50
	},
	position:{
		type: Number,
		required: true,
	},
	owner: {
		type: ObjectId,
		ref: 'User',
		required: true
	}
},
{
	timestamps: true
});

let Picture = module.exports = mongoose.model('Picture', PictureSchema);