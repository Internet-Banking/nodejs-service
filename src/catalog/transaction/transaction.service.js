import * as transactionRepo from './transaction.repository'

export const createInnerTransactions = async (sendingAccountId, receivingAccountId, amount, content, feePayer) => {
  await transactionRepo.createInnerTransactions(sendingAccountId, receivingAccountId, amount, content, feePayer)
}
