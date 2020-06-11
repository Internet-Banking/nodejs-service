import Models from '../../../models/all'
import {sequelize} from '../../db'
import {TRANSACTION_FEE, TRANSACTION_FEE_PAYER} from '../../constants'

export const createInnerTransactions = async (sendingAccountId, receivingAccountId, amount, content, feePayer) => {
  await sequelize.transaction(async (t) => {
    await Models.Accounts.decrement(['balance'], {
      by: amount,
      where: {id: sendingAccountId, isDeleted: false}
    }, {transaction: t})

    await Models.Accounts.increment(['balance'], {
      by: amount,
      where: {id: receivingAccountId, isDeleted: false}
    }, {transaction: t})

    if (feePayer === TRANSACTION_FEE_PAYER.SENDER) {
      await Models.Accounts.decrement(['balance'], {
        by: TRANSACTION_FEE,
        where: {id: sendingAccountId, isDeleted: false}
      }, {transaction: t})
    }
    else {
      await Models.Accounts.decrement(['balance'], {
        by: TRANSACTION_FEE,
        where: {id: receivingAccountId, isDeleted: false}
      }, {transaction: t})
    }

    await Models.InnerTransactions.create({
      sendingAccountId, receivingAccountId, amount, content, feePayer
    }, {transaction: t})
  })
}
