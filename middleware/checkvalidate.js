const {validationResult} = require('express-validator');
const checkValidationErrors = (req,res,next)=> {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next()
    } 
    else{
        req.session.formBody = req.body
        req.session.formErrors = errors.mapped()
        req.flash('danger', 'an error occured')
        res.redirect('back')
    }
}

module.exports = checkValidationErrors
