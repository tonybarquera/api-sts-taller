const boom = require('boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    // TODO sanitizar campos
    if(error) {
      next(boom.badRequest(error));
    }

    next();
  }
} 

module.exports = validatorHandler;