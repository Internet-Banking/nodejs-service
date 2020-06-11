import * as accountService from '../account/account.service'
import {MESSAGE, ACCOUNT_TYPES} from '../../constants'
import {debug} from '../../utils'
import httpStatusCodes from 'http-status-codes'
import moment from 'moment'

const NAMESPACE = `transactionController-${moment.utc().toISOString()}`

export const createInnerTransaction = async (req, res, next) => {
  try {
    const {sendingAccountId, receivingAccountId, amount} = req.body

    const sendingAccount = await accountService.findAccountById(sendingAccountId)
    if (!sendingAccount) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Sending account does not exist.'
      })
    }

    if (sendingAccount.type !== ACCOUNT_TYPES.PAYMENT) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Sending account is not payment account.'
      })
    }

    if (sendingAccount.balance < amount) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Sending account does not have enough money.'
      })
    }

    const receivingAccount = await accountService.findAccountById(receivingAccountId)
    if (!receivingAccount) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'Receiving account does not exist.'
      })
    }

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: {sendingAccount, receivingAccount}
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while creating inner transaction', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}
