import * as recipientAccountRepo from './recipient_account.repository'
import * as accountRepo from '../account/account.repository'

export const findAllRecipientAccountsOfUser = async (userId) => {
  return await recipientAccountRepo.findAllRecipientAccountsOfUser(userId)
}

export const findRecipientAccountById = async (recId) => {
  return await recipientAccountRepo.findRecipientAccountById(recId)
}

export const findRecipientAccountOfUserByAccountId = async (userId, accountId) => {
  return await recipientAccountRepo.findRecipientAccountOfUserByAccountId(userId, accountId)
}

export const createRecipientAccount = async (userId, accountId, nickname) => {
  if (nickname) {
    return await recipientAccountRepo.createRecipientAccount(userId, accountId, nickname)
  }
  const accountInstance = await accountRepo.findAccountWithUserInfoByAccountId(accountId)
  return await recipientAccountRepo.createRecipientAccount(userId, accountId, accountInstance['user.name'])
}

export const updateRecipientAccountById = async (recId, accountId, nickname) => {
  const result = await recipientAccountRepo.updateRecipientAccountById(recId, accountId, nickname)
  return result[1][0]
}

export const deleteRecipientAccountById = async (recId) => {
  const result = await recipientAccountRepo.deleteRecipientAccountById(recId)
  return result[1][0]
}
