import * as outerRecipientAccountService from './outer_recipient_account.service'
import httpStatusCodes from 'http-status-codes'
import moment from 'moment'
import {debug} from '../../utils'
import {MESSAGE, PARTNER_BANK_NAMES} from '../../constants'
import {pgpPartnerFetcher, rsaPartnerFetcher} from '../../fetches'

const NAMESPACE = `OuterRecipientAccountController-${moment.utc().toISOString()}`

export const findAllOuterRecipientAccountsOfUser = async (req, res, next) => {
  try {
    const {id} = req.user
    
    const outerRecipientAccountList = await outerRecipientAccountService.findAllOuterRecipientAccountsOfUser(id)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: outerRecipientAccountList
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while finding all outer recipient accounts of user', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}

export const createOuterRecipientAccount = async (req, res, next) => {
  try {
    const {id} = req.user
    const {accountId, bankName, nickname} = req.body

    const response = bankName === PARTNER_BANK_NAMES.PGP
      ? await pgpPartnerFetcher.getAccountInfo(accountId)
      : await rsaPartnerFetcher.getAccountInfo(accountId)

    if (!response.isSuccess) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Account does not exist.'
      })
    }

    const outerRecipientAccountInstance =
      await outerRecipientAccountService.findOuterRecipientAccountOfUserByAccountId(id, accountId)
    if (outerRecipientAccountInstance) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'User has added this account as a outer recipient account.'
      })
    }

    const result = await outerRecipientAccountService.createOuterRecipientAccount(
      id, accountId, bankName, nickname || response.data.name
    )

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: result
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while creating outer recipient account', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}
