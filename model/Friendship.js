let mongoose = require('mongoose');


let FriendshipSchema = mongoose.Schema({
	user1:{
		type: Schema.Types.ObjectId, 
		ref: 'User'
	},
	user2:{
		type: Schema.Types.ObjectId, 
		ref: 'User'
	},

	addedon:{
		type: Date,
		required: true
	}
});

let Friendship = module.exports = mongoose.model('Friendship', FriendshipSchema);