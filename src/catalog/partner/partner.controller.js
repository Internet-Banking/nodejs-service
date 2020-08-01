import httpStatusCodes from 'http-status-codes'
import {pgpPartnerFetcher, rsaPartnerFetcher} from '../../fetches'
import moment from 'moment'
import {debug} from '../../utils'
import {MESSAGE, PARTNER_BANK_NAMES} from '../../constants'

const NAMESPACE = `recipientAccountController-${moment.utc().toISOString()}`

export const findAccountInPGPPartnerByAccountId = async (req, res, next) => {
  try {
    const {id} = req.params

    const result = await pgpPartnerFetcher.getAccountInfo(id)
    if (result.isSuccess) {
      return res.status(httpStatusCodes.OK).json({
        message: MESSAGE.OK,
        payload: result.data
      })
    }

    return res.status(httpStatusCodes.BAD_REQUEST).json({
      message: `Account does not exist in ${PARTNER_BANK_NAMES.PGP}`
    })
  }
  catch (err) {
    debug.error(NAMESPACE, `Error occured while finding account in ${PARTNER_BANK_NAMES.PGP}`, err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const findAccountInRSAPartnerByAccountId = async (req, res, next) => {
  try {
    const {id} = req.params

    const result = await rsaPartnerFetcher.getAccountInfo(id)
    if (result.isSuccess) {
      return res.status(httpStatusCodes.OK).json({
        message: MESSAGE.OK,
        payload: result.data
      })
    }

    return res.status(httpStatusCodes.BAD_REQUEST).json({
      message: `Account does not exist in ${PARTNER_BANK_NAMES.RSA}`
    })
  }
  catch (err) {
    debug.error(NAMESPACE, `Error occured while finding account in ${PARTNER_BANK_NAMES.PGP}`, err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}
