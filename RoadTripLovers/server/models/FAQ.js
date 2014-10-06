'use strict';

var mongoose = require('mongoose');

var faqSchema = mongoose.Schema({
	number: {type: Number, required: true},
	question: {type: String, required: true},
	answer: {type: String, required: true}
});

module.exports = mongoose.model('FAQ', faqSchema);

//var FAQ = mongoose.model('FAQ', faqSchema);