const filevalidator = require('express-validator');
const {body} = require('express-validator');
const checkValidationErrors = require('./middleware/checkvalidate');

const filevalidating = [  
    body('photo').custom((value,{req})=>{
        if(req.file == undefined){
        throw new Error('file is required')   
        }
        if (!req.file.mimetype.startsWith('image')) {
            throw new Error('only image allowed')
        }
            
        if (req.file.size < 1024 * 1024 * 0.2) {
            throw new Error('file size must be less than 2kb')
        }
        return true
    }),
    checkValidationErrors
 ]

 module.exports = filevalidating;