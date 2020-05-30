import * as accountRepo from './account.repository'

export const findAccountById = async (accountId) => {
  return await accountRepo.findAccountById(accountId)
}

export const increaseBalanceById = async (accountId, balance) => {
  return await accountRepo.increaseBalanceById(accountId, balance)
}
