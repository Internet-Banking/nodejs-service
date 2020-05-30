import Models from '../../../models/all'

export const findAccountById = async (accountId) => {
  return await Models.Accounts.findOne({ where: { id: accountId, isDeleted: false } })
}

export const increaseBalanceById = async (accountId, amount) => {
  const result = await Models.Accounts.increment(['balance'],
    { by: amount, where: { id: accountId, isDeleted: false } })
  return result[0][0][0]
}
