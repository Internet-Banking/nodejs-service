import * as accountRepo from './account.repository'
import * as accountChargeRepo from '../account_charge/account_charge.repository'

export const findAccountById = async (accountId) => {
  return await accountRepo.findAccountById(accountId)
}

export const increaseBalanceById = async (accountId, amount) => {
  const result = await accountRepo.increaseBalanceById(accountId, amount)
  return result[0][0][0]
}

export const chargeAccountById = async (accountId, amount) => {
  await accountChargeRepo.createAccountChargeByAccountId(accountId, amount)
  const result = await accountRepo.increaseBalanceById(accountId, amount)
  return result[0][0][0]
}
