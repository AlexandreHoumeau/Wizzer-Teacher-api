// eslint-disable-next-line max-classes-per-file
import VError from 'verror'
import { parseJSON } from '../json'

class ValidationError extends VError {
  constructor(message, code = 400, $notification = null) {
    super(message)
    this.message = message
    this.code = code
    this.data = { $notification }
  }
}

class ServiceError extends VError {
  constructor(service, err) {
    super(err)
    this.service = service
    const { stack, message, data } = this
    logger.error(message, {
      tags: ['service', service],
      error: `${parseJSON(data)} - ${stack}`
    })
  }
}

class NotFoundError extends Error {
  constructor(message, $notification = null) {
    super(message)
    this.message = message
    this.code = 404
    this.data = { $notification }
  }
}

class CatchError extends Error {
  constructor(message, $notification = null) {
    super(message)
    this.message = message
    this.code = 404
    this.data = { $notification }
  }
}

// class CatchError extends VError {
//   constructor(err, message = '', code = 400, $notification = null) {
//     super(err)
//     this.message = message !== '' ? message : err.message
//     this.code = code
//     this.data = { $notification }
//   }
// }

module.exports = { ValidationError, CatchError, NotFoundError, ServiceError }
