// // import fetchHandler from './fetchHandler'
// // import moment from 'moment'
// // import basicAuth from 'basic-auth'
// // import crypto from 'crypto'
// // import {HTTP_METHOD} from '../constants'
// // import {
// //   PGP_PARTNER_URL,
// //   PGP_PARTNER_BASIC_AUTH_USERNAME,
// //   PGP_PARTNER_BASIC_AUTH_PASSWORD,
// //   PGP_PARTNER_HASH_SECRET,
// //   PGP_PARTNER_PUBLIC_KEY
// // } from '../config'

// // const getAccountInfo = async (accountNumber) => {
// //   const body = {accountNumber}

// //   const partnerHash = crypto.createHmac('md5', PGP_PARTNER_HASH_SECRET).update(JSON.stringify(body)).digest('hex')
// //   const timestamp = moment.unix()

// //   const headers = {
// //     auth: {
// //       username: PGP_PARTNER_BASIC_AUTH_USERNAME,
// //       password: PGP_PARTNER_BASIC_AUTH_PASSWORD
// //     }
// //   }

// //   const response = await fetchHandler(PGP_PARTNER_URL, HTTP_METHOD.POST,
//    'api/partner/check-account', body, headers)
// //   console.log(response)
// // }

// // getAccountInfo()
// const crypto = require('crypto')
// const moment = require('moment')

// console.log({
//   hash: crypto.createHmac('md5', 'webnangcao_hash').update
//(JSON.stringify({accountNumber: 12345678901})).digest('hex'),
//   time: moment().unix()
// })
