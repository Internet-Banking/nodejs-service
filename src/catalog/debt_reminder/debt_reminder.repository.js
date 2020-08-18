import {isEmpty} from 'lodash'
import Models from '../../../models/all'
import {createInnerTransactions} from '../transaction/transaction.repository'
import {findAccountById} from '../account/account.repository'
import {TRANSACTION_FEE_PAYER, TRANSACTION_FEE} from '../../constants'

export const createDebtReminder = async (sendingAccountId, receivingAccountId, amount, content) => {
  return Models.DebtReminders.create({
    sendingAccountId, receivingAccountId, amount, content
  })
}

export const solveDebtReminder = async (id) => {
  const debtReminder = await Models.DebtReminders.findOne({
    where: {id}
  })

  if (!debtReminder) return 'Debt reminder not found.'

  if (debtReminder.isSolved) return 'Debt reminder was solved before.'

  const {receivingAccountId, sendingAccountId, amount, content} = debtReminder.dataValues
  const receivingAccount = await findAccountById(receivingAccountId, true)

  if (!receivingAccount) return 'Receiving account not found.'

  if (receivingAccount.balance < amount + TRANSACTION_FEE) {
    return 'Receiving account does not have enough money.'
  }

  await createInnerTransactions(receivingAccountId, sendingAccountId,
    amount, content, TRANSACTION_FEE_PAYER.SENDER)

  await debtReminder.update({isSolved: true})
  return debtReminder
}

export const deleteDebtReminder = async (id) => {
  await Models.DebtReminders.destroy({where: {id}})
}

export const getDebtReminderByAccounts = async ({sendingAccountIds, receivingAccountIds}, opt) => {
  const {raw = true, offset = 1, limit = null} = opt
  const condition = {}
  if (!isEmpty(sendingAccountIds)) condition.sendingAccountId = sendingAccountIds
  if (!isEmpty(receivingAccountIds)) condition.receivingAccountId = receivingAccountIds

  const instances = await Models.DebtReminders.findAndCountAll({
    where: {
      ...condition
    },
    raw,
    offset,
    limit
  })

  return instances
}
