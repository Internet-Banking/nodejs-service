import {isEmpty} from 'lodash'
import Models from '../../../models/all'
import {sequelize} from '../../db'
import {TRANSACTION_FEE, TRANSACTION_FEE_PAYER, PARTNER_BANK_NAMES} from '../../constants'
import Sequelize from 'sequelize'
const Op = Sequelize.Op

export const createInnerTransactions = async (sendingAccountId, receivingAccountId, amount, content, feePayer) => {
  let increasingAmount = parseInt(amount)
  let decreasingAmount = parseInt(amount)
  if (feePayer === TRANSACTION_FEE_PAYER.SENDER) {
    decreasingAmount += TRANSACTION_FEE
  }
  else {
    increasingAmount -= TRANSACTION_FEE
  }

  await sequelize.transaction(async (t) => {
    await Models.Accounts.decrement(['balance'], {
      by: decreasingAmount,
      where: {id: sendingAccountId, isDeleted: false}
    }, {transaction: t})

    await Models.Accounts.increment(['balance'], {
      by: increasingAmount,
      where: {id: receivingAccountId, isDeleted: false}
    }, {transaction: t})

    await Models.InnerTransactions.create({
      sendingAccountId, receivingAccountId, amount, content, feePayer
    }, {transaction: t})
  })
}

export const createOuterTransaction = async (
  bankName, sendingAccountId, receivingAccountId, amount, feePayer, content, responseData
) => {
  await sequelize.transaction(async (t) => {
    await Models.Accounts.decrement(['balance'], {
      by: parseInt(amount),
      where: {id: sendingAccountId, isDeleted: false}
    }, {transaction: t})

    await Models.OuterTransactions.create({
      bankName, sendingAccountId, receivingAccountId, amount, content, feePayer
    })

    await Models.PartnerResponseLogs.create({
      bankName,
      responseData: JSON.stringify(responseData)
    }, {transaction: t})
  })
}

export const findAllOuterTransactions = async (query, raw = true) => {
  if (query) {
    const searchQuery = {
      createdAt: {
        [Op.lt]: query.endDate,
        [Op.gt]: query.startDate
      }
    }
    return await Models.OuterTransactions.findAll({where: searchQuery, raw})
  }
  return await Models.OuterTransactions.findAll({raw})
}

export const findAllOuterTransactionsOfRSAPartner = async (startDate, endDate, raw = true) => {
  const searchQuery = {bankName: PARTNER_BANK_NAMES.RSA}
  if (startDate && endDate) {
    searchQuery.createdAt = {
      [Op.lt]: new Date(endDate),
      [Op.gt]: new Date(startDate)
    }
  }
  return await Models.OuterTransactions.findAll({where: searchQuery, raw})
}

export const findAllOuterTransactionsOfPGPPartner = async (startDate, endDate, raw = true) => {
  const searchQuery = {bankName: PARTNER_BANK_NAMES.PGP}
  if (startDate && endDate) {
    searchQuery.createdAt = {
      [Op.lt]: new Date(endDate * 1000),
      [Op.gt]: new Date(startDate * 1000)
    }
  }
  return await Models.OuterTransactions.findAll({where: searchQuery, raw})
}

export const getInnerTransactionByAccounts = async ({sendingAccountIds, receivingAccountIds}, opt) => {
  const {raw = true, offset = 1, limit = null} = opt
  const condition = {}
  if (!isEmpty(sendingAccountIds)) condition.sendingAccountId = sendingAccountIds
  if (!isEmpty(receivingAccountIds)) condition.receivingAccountId = receivingAccountIds

  const instances = await Models.InnerTransactions.findAndCountAll({
    where: {
      ...condition
    },
    order: [
      ['createdAt', 'DESC']
    ],
    raw,
    offset,
    limit
  })

  return instances
}

export const getOuterTransactionByAccounts = async ({sendingAccountIds, receivingAccountIds}, opt) => {
  const {raw = true, offset = 1, limit = null} = opt
  const condition = {}
  if (!isEmpty(sendingAccountIds)) condition.sendingAccountId = sendingAccountIds
  if (!isEmpty(receivingAccountIds)) condition.receivingAccountId = receivingAccountIds

  const instances = await Models.OuterTransactions.findAndCountAll({
    where: {
      ...condition
    },
    order: [
      ['createdAt', 'DESC']
    ],
    raw,
    offset,
    limit
  })

  return instances
}
