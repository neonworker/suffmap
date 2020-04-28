const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		max: 150,
		min: 6
	},
	email: {
		type: String,
		required: true,
		max: 150,
		min: 6
	},
	password: {
		type: String,
		required: true,
		max: 1024,
		min: 6
	},
	token: {
		type: String,
		default: undefined,
		required: true
	},
	permissions: {
		type: Number,
		default: 5 
	},
	locationsVisited: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Location',
		time: {
			hour: {
				type: Number
			},
			minute: {
				type: Number
			}
		},
		default: undefined
	}],
	friends: [{
		type: mongoose.Schema.Types.ObjectId,
		dateAdded:{
			type: Date,
			default: Date.now
		},
		ref: 'User'
		}
	]
}, {
	timestamps: true
});

module.exports = mongoose.model('User', UserSchema);