import Models from '../../../models/all'

export const createAccountChargeByAccountId = async (accountId, amount) => {
  return await Models.AccountCharges.create({accountId, amount})
}
