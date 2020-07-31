import * as transactionRepo from './transaction.repository'
import {pgpPartnerFetcher, rsaPartnerFetcher} from '../../fetches'
import {TRANSACTION_FEE, TRANSACTION_FEE_PAYER} from '../../constants'

export const createInnerTransactions = async (sendingAccountId, receivingAccountId, amount, content, feePayer) => {
  await transactionRepo.createInnerTransactions(sendingAccountId, receivingAccountId, amount, content, feePayer)
}

export const transferToPGPPartner = async (sendingAccountId, receivingAccountId, amount, feePayer) => {
  const result = await pgpPartnerFetcher.transfer(
    receivingAccountId,
    feePayer === TRANSACTION_FEE_PAYER.RECEIVER ? amount - TRANSACTION_FEE : amount
  )
  if (result.isSuccess) {
    await transactionRepo.createPartnerReponseLogAndDecreaseAccountBalance(
      'pgp',
      result.data,
      sendingAccountId,
      feePayer === TRANSACTION_FEE_PAYER.RECEIVER ? amount : amount + TRANSACTION_FEE
    )
  }

  return result
}

export const transferToRSAPartner = async (sendingAccountId, receivingAccountId, amount, feePayer) => {
  const result = await rsaPartnerFetcher.transfer(
    sendingAccountId,
    receivingAccountId,
    feePayer === TRANSACTION_FEE_PAYER.RECEIVER ? +amount - TRANSACTION_FEE : +amount
  )
  if (result.isSuccess) {
    await transactionRepo.createPartnerReponseLogAndDecreaseAccountBalance(
      'rsa',
      result.data,
      sendingAccountId,
      feePayer === TRANSACTION_FEE_PAYER.RECEIVER ? +amount : +amount + TRANSACTION_FEE
    )
  }

  return result
}
