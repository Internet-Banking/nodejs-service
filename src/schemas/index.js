import Joi from '@hapi/joi'
import { PARTNER_CODE_PGP, PARTNER_CODE_RSA } from '../config'

export const getAccountInfoQuerySchema = Joi.object({
  partnerCode: Joi
    .string()
    .valid(PARTNER_CODE_PGP, PARTNER_CODE_RSA)
    .required(),
  createdAt: Joi
    .date()
    .required()
    .example('2020-05-18T08:59:33.170Z')
    .description('get by new Date(), 60s expiry'),
  secureHash: Joi
    .string()
    .trim()
    .required()
    .example('e6ce09ae6695ad034f8b6e6aadf2726f')
    .description('{ partnerCode, createdAt } hashed with SHA256')
})
