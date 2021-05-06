const JOI = require('joi')

exports.contactValidation = (data) => {
const schema = JOI.object({
    firstname: JOI.string().required().trim().min(2),
    lastname: JOI.string().required().trim().min(2),
    email: JOI.string().required().trim().min(2),
    subject: JOI.string().required().trim().min(2),
    message: JOI.string().required().trim().min(5)
})
return schema.validate(data)
}

