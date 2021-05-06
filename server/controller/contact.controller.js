const User = require('../model/contact');
// const User = require('../model/contact')
const ApiError = require('../utils/ApiError');
const { contactValidation } = require('../utils/validation');

exports.createContact = async (req, res, next) => {
    
  try {
    const {error} = contactValidation(req.body)
    if(error){
        return next(new ApiError(error, 401))
    }
    const contactDetails = await User.create(req.body);
    res.status(200).json({
      status: 'success',
      message: contactDetails,
    });
  } catch (error) {
    next(new ApiError(error, 401));
  }
};
