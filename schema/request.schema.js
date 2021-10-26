//const { string } = require('@hapi/joi');
const Joi = require('@hapi/joi');
const {string} = require('../schema/constants/joi-constants');


module.exports = {

    "books-list" : Joi.object({
        "query" : Joi.object({
            "author" : string.required(),
        }).unknown(false) 
    }).unknown(true).options({abortEarly : false}),

    "book" : Joi.object({
        "query" : Joi.object({
            "author" : string.required(),
            "title" : string.required()
        }).unknown(false) 
    }).unknown(true).options({abortEarly : false})

};