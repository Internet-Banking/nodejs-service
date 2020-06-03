import * as recipientAccountRepo from './recipient_account.repository'

export const findAllRecipientAccountsOfUser = async (userId) => {
  return await recipientAccountRepo.findAllRecipientAccountsOfUser(userId)
}
