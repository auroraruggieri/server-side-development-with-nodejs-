// grab the things we need
var mongoose = require('mongoose');

// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);

var Currency = mongoose.Types.Currency;
var Schema = mongoose.Schema;


// Adding Sub-documents to a Document
// For filed comment
var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// create a schema
var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
	category: {
        type: String,
        required: true
    },
	label: {
        type: String,
		default: '',
		required: false
	},
	price: {
		type: Currency,
		required: true
    },
    description: {
        type: String,
        required: true
    },
	// Adding Sub-documents to a Document
    comments:[commentSchema]
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Dishes = mongoose.model('Dish', dishSchema);

// make this available to our Node applications
module.exports = Dishes;