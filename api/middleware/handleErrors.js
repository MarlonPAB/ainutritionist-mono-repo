const ERROR_HANDLERS = {
  CastError: response =>
    response.status(400).send({
      error: 'Id used has a wrong format'
    }),

  ValidationError: (response, { message }) =>
    response.status(409).send({
      error: message
    }),

  JsonWebTokenError: (response) =>
    response.status(401).json({
      error: 'token missing or invalid'
    }),

  TokenExpirerError: response =>
    response.status(401).json({ error: 'token expired' }),

  defaultError: response => response.status(500).end()
}
module.exports = (error, request, response, next) => {
  console.log(error.name)

  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  handler(response, error)
}
