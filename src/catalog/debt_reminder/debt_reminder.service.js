import * as debtReminderRepo from './debt_reminder.repository'

export const createDebtReminder = async (sendingAccountId, receivingAccountId, amount, content) => {
  return debtReminderRepo.createDebtReminder(sendingAccountId, receivingAccountId, amount, content)
}

export const solveDebtReminder = async (id, reject) => {
  return debtReminderRepo.solveDebtReminder(id, reject)
}

export const deleteDebtReminder = async (id) => {
  return debtReminderRepo.deleteDebtReminder(id)
}

export const getDebtReminderByAccounts = async ({sendingAccountIds, receivingAccountIds}, opt) => {
  return debtReminderRepo.getDebtReminderByAccounts({sendingAccountIds, receivingAccountIds}, opt)
}
