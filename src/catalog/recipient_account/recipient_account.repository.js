import Models from '../../../models/all'

export const findAllRecipientAccountsOfUser = async (userId, raw = true) => {
  return await Models.RecipientAccounts.findAll({where: {userId, isDeleted: false}, raw})
}

export const findRecipientAccountById = async (recId, raw = true) => {
  return await Models.RecipientAccounts.findOne({where: {id: recId, isDeleted: false}, raw})
}

export const findRecipientAccountOfUserByAccountId = async (userId, accountId, raw = true) => {
  return await Models.RecipientAccounts.findOne({where: {userId, accountId, isDeleted: false}, raw})
}

export const createRecipientAccount = async (userId, accountId, nickname) => {
  return await Models.RecipientAccounts.create({userId, accountId, nickname})
}

export const updateRecipientAccountById = async (recId, accountId, nickname, returning = true) => {
  return await Models.RecipientAccounts.update(
    {accountId, nickname},
    {where: {id: recId, isDeleted: false}, returning}
  )
}

export const deleteRecipientAccountById = async (recId, returning = true) => {
  return await Models.RecipientAccounts.update(
    {isDeleted: true},
    {where: {id: recId, isDeleted: false}, returning}
  )
}
