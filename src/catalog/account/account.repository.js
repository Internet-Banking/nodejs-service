import Models from '../../../models/all'
import {generators} from '../../utils'

export const findAccountById = async (accountId) => {
  return await Models.Accounts.findOne({where: {id: accountId, isDeleted: false}})
}

export const increaseBalanceById = async (accountId, amount) => {
  return await Models.Accounts.increment(['balance'],
    {by: amount, where: {id: accountId, isDeleted: false}})
}

export const createPaymentAccountByUserId = async (userId) => {
  return await Models.Accounts.create({
    id: generators.generateAccountID(),
    userId
  }) //defaultValue for account type is PAYMENT
}
