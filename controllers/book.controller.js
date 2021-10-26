const BookBiz = require('../biz/book.biz');
const requestScehma = require('../schema/request.schema');
const JsonObjectValidator = require('../validators/jsonobject.validator');

class BookController {

	constructor() {
		this.bookBiz = new BookBiz();
	}

	register(app) {
		app.route('/v1/books')
			.get(async (request, response, next) => {
				try {

					let { body, params, query } = request;

					new JsonObjectValidator(requestScehma['books-list']).create({body, params, query});
				
					const result = await this.bookBiz.fetch(query);
					
					response.json(
						{
							result,
						},
						'fetching list of Auhtor Books',
						null
					);

				} catch (error) {
					next(error);
				}
			});

		app.route('/v1/book')
			.get(async (request, response, next) => {
				try {

					let { body, params, query } = request;

					new JsonObjectValidator(requestScehma['book']).create({body, params, query});
				
					const result = await this.bookBiz.fetchBook(query);
					
					response.json(
						{
							result,
						},
						'fetching Book',
						null
					);

				} catch (error) {
					next(error);
				}
			});	

	}
}

module.exports = BookController;
