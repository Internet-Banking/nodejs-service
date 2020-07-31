import md5 from 'md5'
import axios from 'axios'
import NodeRSA from 'node-rsa'
import {
  RSA_PARTNER_URL,
  RSA_PARTNER_PUBLIC_KEY,
  RSA_PARTNER_SECRET_CODE,
  RSA_PRIVATE_KEY
} from '../config'

const rsaPartnerPublicKey = new NodeRSA(RSA_PARTNER_PUBLIC_KEY)
const bankRSAPrivateKey = new NodeRSA(RSA_PRIVATE_KEY)
//https://sacombank-internet-banking.herokuapp.com/
const getAccountInfo = async (accountNumber) => {
  try {
    const body = {number: accountNumber}
    const requestBody = {message: rsaPartnerPublicKey.encrypt(body, 'base64')}
    const timestamp = Date.now()
    const headers = {
      'x-timestamp': timestamp,
      'x-partner-code': RSA_PARTNER_SECRET_CODE,
      'x-partner-sign': md5(timestamp.toString() + JSON.stringify(requestBody) + 'sacombank-linking-code')
    }

    const response = await axios.post(`${RSA_PARTNER_URL}/services/accounts/info/`, requestBody, {headers})
    const parsedResponse = await JSON.parse(bankRSAPrivateKey.decrypt(response.data.messageResponse, 'utf8'))
    if (!parsedResponse.success) {
      return {isSuccess: false, data: parsedResponse.message}
    }

    return {isSuccess: true, data: parsedResponse.data}
  }
  catch (error) {
    return {isSuccess: false, error: error.response.data}
  }
}

const transfer = async (sendingAccountId, receivingAccountId, amount, message) => {
  try {
    const body = {numberReceiver: receivingAccountId, numberSender: sendingAccountId, amount, message}
    const requestBody = {
      message: rsaPartnerPublicKey.encrypt(body, 'base64'),
      signature: bankRSAPrivateKey.sign(body, 'base64')
    }
    const timestamp = Date.now()
    const headers = {
      'x-timestamp': timestamp,
      'x-partner-code': RSA_PARTNER_SECRET_CODE,
      'x-partner-sign': md5(timestamp.toString() + JSON.stringify(requestBody) + 'sacombank-linking-code')
    }

    const response = await axios.post(`${RSA_PARTNER_URL}/services/accounts/transfer/`, requestBody, {headers})
    const parsedResponse = await JSON.parse(bankRSAPrivateKey.decrypt(response.data.messageResponse, 'utf8'))
    if (!parsedResponse.success) {
      return {isSuccess: false, error: parsedResponse.message}
    }

    return {isSuccess: true, data: parsedResponse}
  }
  catch (error) {
    return {isSuccess: false, error: error.response.data}
  }
}

export default {getAccountInfo, transfer}
