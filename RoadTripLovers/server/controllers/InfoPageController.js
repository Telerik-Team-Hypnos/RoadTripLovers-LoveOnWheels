'use strict';

var mongoose = require('mongoose');
var InfoPage = mongoose.model('InfoPage');
var FAQ = mongoose.model('FAQ');

function updateAboutInfo(res, aboutContent) {
	if (!aboutContent) {
		res.status(400);
		return res.send({reason: 'Invalid "about" content.'});
	}

	InfoPage.findOne()
		.exec(function (err, infoPage) {
			if (err) {
				res.status(400);
				return res.send({reason: err.toString()});
			}

			infoPage.about = aboutContent;

			infoPage.save(function (err, response) {
				if (err) {
					res.status(400);
					return res.send({reason: err.toString()});
				}

				res.status(200);
				return res.send(response);
			});
		});
}

function updateTermsInfo(res, termsContent) {
	if (!termsContent) {
		res.status(400);
		return res.send({reason: 'Invalid "terms" content.'});
	}

	InfoPage.findOne()
		.exec(function (err, infoPage) {
			if (err) {
				res.status(400);
				return res.send({reason: err.toString()});
			}

			infoPage.terms = termsContent;

			infoPage.save(function (err, response) {
				if (err) {
					res.status(400);
					return res.send({reason: err.toString()});
				}

				res.status(200);
				return res.send(response);
			});
		});
}

function updateFaq(res, faqToUpdate) {
	if (faqToUpdate.number === undefined) {
		res.status(400);
		return res.send({reason: 'Number of the faq question is required.'});
	}

	InfoPage.findOne()
		.exec(function (err, infoPage) {
			if (err) {
				res.status(400);
				return res.send({reason: err.toString()});
			}

			var numberOfFaq = infoPage.faq.length;

			for (var i = 0; i < numberOfFaq; i++) {
				if (infoPage.faq[i].number == faqToUpdate.number) {
					if (faqToUpdate.question) {
						infoPage.faq[i].question = faqToUpdate.question;
					}
					if (faqToUpdate.answer) {
						infoPage.faq[i].answer = faqToUpdate.answer;
					}

					infoPage.save(function (err, response) {
						if (err) {
							res.status(400);
							return res.send({reason: err.toString()});
						}

						res.status(200);
						return res.send(response);
					});

					return;
				}
			}
		});
}

function addFaq(res, faqToAdd) {
	if (faqToAdd.number === undefined) {
		res.status(400);
		return res.send({reason: 'Number of the faq question is required.'});
	}

	InfoPage.findOne()
		.exec(function (err, infoPage) {
			if (err) {
				res.status(400);
				return res.send({reason: err.toString()});
			}

			var numberOfFaq = infoPage.faq;

			for (var i = 0; i < numberOfFaq; i++) {
				if (infoPage.faq[i] == faqToAdd.number) {
					res.status(400);
					return res.send({reason: 'FAQ with such number already exists.'});
				}
			}

			var newFaq = new FAQ({
				number: faqToAdd.number,
				question: faqToAdd.question,
				answer: faqToAdd.answer
			});

			infoPage.faq.push(newFaq);

			infoPage.save(function (err, response) {
				if (err) {
					res.status(400);
					return res.send({reason: err.toString()});
				}

				res.status(200);
				return res.send(response);
			});
		});
}

function removeFaq(res, faqNumber) {
	if (!faqNumber) {
		console.log('Number of the faq question is required.');
		return;
	}

	InfoPage.findOne()
		.exec(function (err, infoPage) {
			if (err) {
				res.status(400);
				return res.send({reason: err.toString()});
			}

			var numberOfFaq = infoPage.faq;

			for (var i = 0; i < numberOfFaq; i++) {
				if (infoPage.faq[i] == faqNumber) {
					infoPage.faq.splice(i, 1);
				}
			}

			infoPage.save(function (err, response) {
				if (err) {
					res.status(400);
					return res.send({reason: err.toString()});
				}

				res.status(200);
				return res.send(response);
			});
		});
}

function getInfoPage(res) {
	InfoPage.findOne()
		.exec(function (err, infoPage) {
			if (err) {
				res.status(400);
				return res.send({reason: err.toString()});
			}

			res.status(200);
			return res.send(infoPage);
		});
}

module.exports = {
	updateAboutInfo: updateAboutInfo,
	updateTermsInfo: updateTermsInfo,
	updateFaq: updateFaq,
	addFaq: addFaq,
	removeFaq: removeFaq,
	getInfoPage: getInfoPage
};