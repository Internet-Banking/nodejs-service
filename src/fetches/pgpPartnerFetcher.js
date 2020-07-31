import moment from 'moment'
import crypto from 'crypto'
import axios from 'axios'
import * as openPGP from 'openpgp'
import {
  PGP_PARTNER_URL,
  PGP_PARTNER_BASIC_AUTH_USERNAME,
  PGP_PARTNER_BASIC_AUTH_PASSWORD,
  PGP_PARTNER_HASH_SECRET,
  PGP_KEY_PASSPHRASE,
  PGP_PRIVATE_KEY
} from '../config'

//https://beohoang98-bank-dev.herokuapp.com/api-docs/
const getAccountInfo = async (accountNumber) => {
  try {
    const body = {accountNumber: +accountNumber}
  
    const partnerHash = crypto.createHmac('md5', PGP_PARTNER_HASH_SECRET).update(JSON.stringify(body)).digest('hex')
    const timestamp = moment().unix()
    
    const auth = {
      username: PGP_PARTNER_BASIC_AUTH_USERNAME,
      password: PGP_PARTNER_BASIC_AUTH_PASSWORD
    }
    const headers = {
      'x-partner-hash': partnerHash,
      'x-partner-time': timestamp
    }

    const response = await axios.post(`${PGP_PARTNER_URL}/api/partner/check-account`, body, {auth, headers})

    return {isSuccess: true, data: response.data}
  }
  catch (error) {
    return {isSuccess: false, error: error.response.data}
  }
}

const transfer = async (accountNumber, amount, message) => {
  try {
    const sendData = {accountNumber: +accountNumber, amount, message}
    const {keys: [privateKey]} = await openPGP.key.readArmored(PGP_PRIVATE_KEY)
    await privateKey.decrypt(PGP_KEY_PASSPHRASE)
    const {signature} = await openPGP.sign({
      detached: true,
      message: openPGP.cleartext.fromText(JSON.stringify(sendData)),
      privateKeys: privateKey
    })

    const requestBody = {data: sendData, signature}

    const hash = crypto.createHmac('md5', PGP_PARTNER_HASH_SECRET).update(JSON.stringify(requestBody)).digest('hex')
    const timestamp = moment().unix()
    
    const headers = {
      'x-partner-hash': hash,
      'x-partner-time': timestamp
    }
    const auth = {
      username: PGP_PARTNER_BASIC_AUTH_USERNAME,
      password: PGP_PARTNER_BASIC_AUTH_PASSWORD
    }
    const response = await axios.post(`${PGP_PARTNER_URL}/api/partner/send/v2`, requestBody, {auth, headers})
    return {isSuccess: true, data: response.data}
  }
  catch (error) {
    return {isSuccess: false, error: error.response.data}
  }
}

export default {getAccountInfo, transfer}
