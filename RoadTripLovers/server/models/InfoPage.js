'use strict';

var mongoose = require('mongoose');
//var FAQ = require('mongoose').model('FAQ');
var FAQ = require('./FAQ');

var faqSchema = mongoose.Schema({
	number: {type: Number, required: true},
	question: {type: String, required: true},
	answer: {type: String, required: true}
});

var infoPageSchema = mongoose.Schema({
	about: {type: String, required: true},
	terms: {type: String, required: true},
	faq: {type: [faqSchema], required: true}
});

var InfoPage = mongoose.model('InfoPage', infoPageSchema);

function seedInitial() {
	InfoPage.find({})
		.exec(function (err, collection) {
			if (err) {
				console.log(err);
				return;
			}

			if (collection.length === 0) {
				var newInfoPage = new InfoPage({
					about: 'You are a truck driver on his long route across the world who suffers from lack of love and affection in those lonely nights? ' +
						'Or are you someone dying slowly in your blunt everyday life and looking for the thrill of a short term relationship with one of the most hardcore guys out there? ' +
						'If the answer is YES, then you are in the right place! ' +
						'We made this site with the simple thought of satisfying your wildest dreams. ' +
						'Join us now and change your life forever!',
					terms: 'By registering in this site you hereby allow "Team Hypnos" to use your personal date for any kind of use, including selling it to third party companies. ' +
						'"Team Hypnos" is not responsible for the truthfulness of the registered accounts. ' +
						'We cannot be held responsible in case of infection by sexually transmitted diseases of any kind. ' +
						'We warn you to be caution when interacting with people either online or in person.',
					faq:[
						new FAQ({
							number: 1,
							question: 'Do I get charged for registering in your site?',
							answer: 'Our services are completely free. We may only tax a truck driver for his/her initial registration.'
						}),
						new FAQ({
							number: 2,
							question: 'What are the chances my spoose find out I have registration here?',
							answer: 'I am afraid the chances are high. Our site is extremely popular and your spoose has probably heard of it. ' +
								'We strongly recommend you to use fake name and/or picture.'
						}),
						new FAQ({
							number: 3,
							question: 'I had intercourse with guy/gal I met in your site and now I have syphilis. What to do?',
							answer: 'Go see a doctor and use condom next time!'
						})
					]
				});

				newInfoPage.save(function (err, response) {
					if (err) {
						console.log(err);
						return;
					}

					console.log(response);
				});
			}
		});
}

module.exports.seedInitial = seedInitial;