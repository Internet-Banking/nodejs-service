import * as recipientAccountService from './recipient_account.service'
import httpStatusCodes from 'http-status-codes'
import moment from 'moment'
import {debug} from '../../utils'
import {MESSAGE} from '../../constants'

const NAMESPACE = `recipientAccountController-${moment.utc().toISOString()}`

export const findAllRecipientAccountsOfUser = async (req, res, next) => {
  try {
    const {id} = req.user
    
    const recipientAccountList = await recipientAccountService.findAllRecipientAccountsOfUser(id)

    return res.status(httpStatusCodes.OK).json({
      message: MESSAGE.OK,
      payload: recipientAccountList
    })
  }
  catch (err) {
    debug.error(NAMESPACE, 'Error occured while increasing balance of account', err)
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.INTERNAL_SERVER_ERROR
    })
  }
}
