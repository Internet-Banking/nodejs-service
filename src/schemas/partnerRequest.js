import Joi from '@hapi/joi'
import {PARTNER_CODE_PGP, PARTNER_CODE_RSA} from '../config'

const partnerEssentialSchema = Joi.object({
  partnerCode: Joi
    .string()
    .valid(PARTNER_CODE_PGP, PARTNER_CODE_RSA)
    .required()
    .messages({
      'any.only': 'partnerCode is not valid.'
    }),
  createdAt: Joi
    .date()
    .required()
    .example('2020-05-27T05:26:17.723Z')
    .description('get by moment.utc().toISOString(), 60s expiry'),
  secureHash: Joi
    .string()
    .trim()
    .required()
    .example('c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e')
    .description(`JSON.stringify(object without secureHash)
    hashed with crypto.createHmac("sha256", HASH_SECRET).update(<stringifyObject>).digest("hex")`)
})

export const getUserInfoByAccountIdQuerySchema = partnerEssentialSchema

export const increaseBalanceSchema = partnerEssentialSchema.append({
  amount: Joi
    .number()
    .min(0)
    .required(),
  signature: Joi
    .string()
    .min(0)
    .required()
})

export const increaseBalanceParamsSchema = Joi.object({
  id: Joi
    .string()
    .alphanum() //can only validate if id is alpha numeric characters
    .length(16)
    .required()
})
