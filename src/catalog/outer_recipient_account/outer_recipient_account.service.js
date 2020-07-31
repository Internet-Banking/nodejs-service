import * as outerRecipientAccountRepo from './outer_recipient_account.repository'

export const findAllOuterRecipientAccountsOfUser = async (userId) => {
  return await outerRecipientAccountRepo.findAllOuterRecipientAccountsOfUser(userId)
}

export const findOuterRecipientAccountById = async (recId) => {
  return await outerRecipientAccountRepo.findOuterRecipientAccountById(recId)
}

export const findOuterRecipientAccountOfUserByAccountId = async (userId, accountId) => {
  return await outerRecipientAccountRepo.findOuterRecipientAccountOfUserByAccountId(userId, accountId)
}

export const createOuterRecipientAccount = async (userId, accountId, bankName, nickname) => {
  return await outerRecipientAccountRepo.createOuterRecipientAccount(userId, accountId, bankName, nickname)
}

export const updateOuterRecipientAccountById = async (recId, accountId, bankName, nickname) => {
  const result = await outerRecipientAccountRepo.updateOuterRecipientAccountById(recId, accountId, bankName, nickname)
  return result[1][0]
}

export const deleteOuterRecipientAccountById = async (recId) => {
  const result = await outerRecipientAccountRepo.deleteOuterRecipientAccountById(recId)
  return result[1][0]
}
