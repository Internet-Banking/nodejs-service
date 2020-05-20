import * as accountRepo from './account.repository'

export const increaseBalanceById = async (accountId, balance) => {
  return await accountRepo.increaseBalanceById(accountId, balance)
}
