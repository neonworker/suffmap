let mongoose = require('mongoose');


let LocationSchema= mongoose.Schema({
	public: {
		type: Boolean,
		default: false,
		required: true
	},
	owner:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
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
	openingHours:[{
		day:{
			type: String
		},
		start:{
			hour:{
				type: Number
			},
			minute:{
				type: Number
			}
		},
		end: {
			hour:{
				type: Number
			},
			minute:{
				type: Number
			}
		}
	}],
	pictures:[{
		type:mongoose.Schema.Types.ObjectId,
		default: undefined,
	}],
	events:[{
		type:mongoose.Schema.Types.ObjectId,
		default: undefined,
	}]
},
{
	timestamps: true
});

let Location = module.exports = mongoose.model('Location', LocationSchema);