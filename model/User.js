const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	
	name:{
		type: String,
		required: true,
		max: 150,
		min: 6
	},
	email:{
		type: String,
		required: true,
		max: 150,
		min: 6
	},
	password:{
		type: String,
		required: true,
		max: 1024,
		min: 6
	},
	tokens : []
},
{
	timestamps: true
});

module.exports = mongoose.model('User', UserSchema);