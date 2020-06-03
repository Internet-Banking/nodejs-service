import Models from '../../../models/all'

export const findAllRecipientAccountsOfUser = async (userId, raw = true) => {
  return await Models.RecipientAccounts.findAll({where: {userId, isDeleted: false}, raw})
}
