const NodeRSA = require('node-rsa')
const dotenv = require('dotenv')
const crypto = require('crypto')
dotenv.config()
const RSA_PRIVATE_KEY = process.env.RSA_PRIVATE_KEY.replace(/\\n/g, '\n')
const RSA_PUBLIC_KEY = process.env.RSA_PUBLIC_KEY.replace(/\\n/g, '\n')
const HASH_SECRET = process.env.HASH_SECRET
const PARTNER_CODE_RSA = process.env.PARTNER_CODE_RSA

const privateKey = new NodeRSA(RSA_PRIVATE_KEY)
const publicKey = new NodeRSA(RSA_PUBLIC_KEY)

//sender's code
const body = {
  amount: 10000,
  partnerCode: PARTNER_CODE_RSA,
  createdAt: new Date()
}

const stringifyBody = JSON.stringify(body)

const reqBody = {
  amount: '10000',
  partnerCode: 'PARTNER_CODE_RSA',
  createdAt: '2020-05-21T02:47:30.829Z',
  secureHash: crypto.createHmac("sha256", HASH_SECRET).update(stringifyBody).digest("hex")
}

const signature = privateKey.sign(reqBody, 'base64');

//receiver's code
const isVerified = publicKey.verify(reqBody, signature, 'base64', 'base64');

if (isVerified) { /*continue*/ }

// eslint-disable-next-line no-console
console.log({ body, signature, isVerified })
