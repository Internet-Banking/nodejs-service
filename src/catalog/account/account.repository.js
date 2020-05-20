import Models from '../../../models/all'

export const increaseBalanceById = async (accountId, amount) => {
  return await Models.Accounts.increment(['balance'], { by: amount, where: { id: accountId, isDeleted: false } })
}
