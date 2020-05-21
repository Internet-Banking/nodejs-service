const NodeRSA = require('node-rsa')
const dotenv = require('dotenv')
dotenv.config()
const RSA_PRIVATE_KEY = process.env.RSA_PRIVATE_KEY.replace(/\\n/g, '\n')
const RSA_PUBLIC_KEY = process.env.RSA_PUBLIC_KEY.replace(/\\n/g, '\n')

const privateKey = new NodeRSA(RSA_PRIVATE_KEY)
const publicKey = new NodeRSA(RSA_PUBLIC_KEY)

//sender's code
const body = {
  amount: '10000',
  partnerCode: 'PARTNER_CODE_RSA',
  createdAt: '2020-05-21T02:47:30.829Z',
  secureHash: 'fa5dc4b9937410389107246c29e80e1347512d5f65e9baaf1438e008dca4c71b'
}

const signature = privateKey.sign(body, 'base64');

//receiver's code
const isVerified = publicKey.verify(body, signature, 'base64', 'base64');

if (isVerified) { /*continue*/ }

// eslint-disable-next-line no-console
console.log({ body, signature, isVerified })
