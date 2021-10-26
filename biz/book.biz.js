const util = require('../utils/helper.utility');

const HttpProxy = require('../proxy/http-proxy');
const API_SUIT = require('../constants/api-suits.json');
const { BaseException } = require('../exceptions');
const config= require('config');
const json2xls = require('json2xls');
const fs = require('fs');

class Book {
	
	constructor() {}

	async fetch({author}) {
		try {

			if(!author) throw new BaseException("author required");
		
			let books = await this.getBooks(author);
			
            const xls = json2xls(books);
            fs.writeFileSync('./file/data.xlsx', xls, 'binary');            
			
			return books;

		} catch (error) {
			throw(error);
		}
	}

    async fetchBook({author, title}) {
		try {

			if(!author || !title) return [];
			
			let books = await this.getBooks(author);
			
            if(books.length <=0) throw new BaseException("No Book Found");

            let book = books.filter(book => book.book_title == title);

			return book;

		} catch (error) {
			throw(error);
		}
	}

	async getBooks(author) {
        try {
            let queryParams = {
				"author" : author,
				"api-key" : config.get('NYT.api-key')
			};

            let bookRequest = new HttpProxy(this.addQueryParams(API_SUIT.NYT.BOOKS_API, queryParams), null, null);
            const response = await bookRequest.make_request();
            return response.results;
        } catch(error) {
            throw(error);
        }
    }

	addQueryParams(apiDetails, query) {
        try {
            let queryString = '';
            for(let key in query) {
                if(queryString.length<1) {
                    queryString += `?${key}=${query[key]}`;
                } else {
                    queryString += `&${key}=${query[key]}`;
                } 
            }
            if(queryString.length>0) {
                let newApiDetails = {...apiDetails};
                newApiDetails.endpoint += queryString;
                return newApiDetails;
            }
            return apiDetails;
        } catch(error) {
            throw(error);
        }
    }

}

module.exports = Book;
