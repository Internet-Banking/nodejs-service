import httpStatusCodes from 'http-status-codes'
import { sortObject } from '../utils/objectHandler'
import { HASH_SECRET } from '../config'
import crypto from 'crypto'

//validate property of req by schema
export const schemaValidator = (schema, property) => {
  //property: body, params, query,...
  return async (req, res, next) => {
    const { error } = await schema.validate(req[property])

    if (!error) {
      next()
    }
    else {
      const { details } = error
      const errMessage = details.map(detail => detail.message).join(',')
      res.status(httpStatusCodes.BAD_REQUEST).json({ message: errMessage })
    }
  }
}

//check if req is expired with createdAt field in req[property]
export const expiryValidator = (property) => {
  return async (req, res, next) => {
    const { createdAt } = req[property]
    const now = new Date()
    const reqCreatedAt = new Date(createdAt)

    const elapsedTimeInMilliseconds = now.getTime() - reqCreatedAt.getTime()

    if (elapsedTimeInMilliseconds > 60000) {
      res.status(httpStatusCodes.BAD_REQUEST).json({ message: 'Request is expired!' })
    }
    else {
      next()
    }
  }
}

//validate if other keys was modified or not
export const secureHashValidator = (property) => {
  return async (req, res, next) => {
    const propertyObject = sortObject(req[property])
    const queryHash = propertyObject.secureHash
    delete propertyObject.secureHash

    const stringifiedPropertyObject = JSON.stringify(propertyObject)
    const hash = crypto.createHmac('sha256', HASH_SECRET).update(stringifiedPropertyObject).digest('hex')

    if (hash === queryHash) {
      next()
    }
    else {
      res.status(httpStatusCodes.BAD_REQUEST).json({ message: 'Not secure request!' })
    }
  }
}
