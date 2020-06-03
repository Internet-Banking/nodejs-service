import Models from '../../../models/all'

export const findAllRecipientAccountsOfUser = async (userId, raw = true) => {
  return await Models.RecipientAccounts.findAll({where: {userId, isDeleted: false}, raw})
}

export const findRecipientAccountOfUserByAccountId = async (userId, accountId, raw = true) => {
  return await Models.RecipientAccounts.findOne({where: {userId, accountId}, raw})
}

export const createRecipientAccount = async (userId, accountId, nickname) => {
  return await Models.RecipientAccounts.create({userId, accountId, nickname})
}
