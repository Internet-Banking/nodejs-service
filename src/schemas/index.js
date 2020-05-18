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
    .example('c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e')
    .description(`JSON.stringify({ partnerCode, createdAt })
    hashed with crypto.createHmac("sha256", <secret>).update(<stringify>).digest("hex")`)
})
