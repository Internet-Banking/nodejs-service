const NodeRSA = require('node-rsa')
const dotenv = require('dotenv')
dotenv.config()
const RSA_PRIVATE_KEY = process.env.RSA_PRIVATE_KEY.replace(/\\n/g, '\n')
const RSA_PUBLIC_KEY = process.env.RSA_PUBLIC_KEY.replace(/\\n/g, '\n')

const privateKey = new NodeRSA(RSA_PRIVATE_KEY)
const publicKey = new NodeRSA(RSA_PUBLIC_KEY)

//partner code
const body = {
  amount: 10000,
  partnerCode: 'PARTNER_CODE_RSA',
  createdAt: '2020-05-19T21:36:11.731Z',
  secureHash: '140a65f2fad2a4a993c1293348879a2b9faa87ded563f2381d3f0bf361c1a47e'
}

const signedData = privateKey.sign(body);

//team code
const isVerified = publicKey.verify(body, signedData);

// eslint-disable-next-line no-console
console.log({ body, signedData, isVerified })
