import * as transactionRepo from './transaction.repository'
import {pgpPartnerFetcher, rsaPartnerFetcher} from '../../fetches'
import {TRANSACTION_FEE, TRANSACTION_FEE_PAYER, PARTNER_BANK_NAMES} from '../../constants'

export const createInnerTransactions = async (sendingAccountId, receivingAccountId, amount, content, feePayer) => {
  await transactionRepo.createInnerTransactions(sendingAccountId, receivingAccountId, amount, content, feePayer)
}

export const transferToPGPPartner = async (sendingAccountId, receivingAccountId, amount, feePayer, content) => {
  const result = await pgpPartnerFetcher.transfer(
    receivingAccountId,
    feePayer === TRANSACTION_FEE_PAYER.RECEIVER ? amount - TRANSACTION_FEE : amount,
    content
  )
  if (result.isSuccess) {
    await transactionRepo.createOuterTransaction(
      PARTNER_BANK_NAMES.PGP,
      sendingAccountId,
      receivingAccountId,
      feePayer === TRANSACTION_FEE_PAYER.RECEIVER ? amount : amount + TRANSACTION_FEE,
      feePayer,
      content,
      result.data
    )
  }

  return result
}

export const transferToRSAPartner = async (sendingAccountId, receivingAccountId, amount, feePayer, content) => {
  const result = await rsaPartnerFetcher.transfer(
    sendingAccountId,
    receivingAccountId,
    feePayer === TRANSACTION_FEE_PAYER.RECEIVER ? amount - TRANSACTION_FEE : amount,
    content
  )
  if (result.isSuccess) {
    await transactionRepo.createOuterTransaction(
      PARTNER_BANK_NAMES.RSA,
      sendingAccountId,
      receivingAccountId,
      feePayer === TRANSACTION_FEE_PAYER.RECEIVER ? amount : amount + TRANSACTION_FEE,
      feePayer,
      content,
      result.data
    )
  }

  return result
}

export const findAllOuterTransactions = async (startDate, endDate) => {
  return await transactionRepo.findAllOuterTransactions(startDate, endDate)
}

export const findAllOuterTransactionsOfRSAPartner = async (startDate, endDate) => {
  return await transactionRepo.findAllOuterTransactionsOfRSAPartner(startDate, endDate)
}

export const findAllOuterTransactionsOfPGPPartner = async (startDate, endDate) => {
  return await transactionRepo.findAllOuterTransactionsOfPGPPartner(startDate, endDate)
}
