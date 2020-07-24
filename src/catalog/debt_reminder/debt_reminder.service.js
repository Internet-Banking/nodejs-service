import * as debtReminderRepo from './debt_reminder.repository'

export const createDebtReminder = async (fromUserId, toUserId, debtAmount, contentOfDebt) => {
  return await debtReminderRepo.createDebtReminder(fromUserId, toUserId, debtAmount, contentOfDebt)
}

export const getListOfDebtReminderUserSent = async (userId) => {
  return await debtReminderRepo.getListOfDebtReminderUserSent(userId)
}

export const getListOfDebtReminderUserRecive = async (userId) => {
  return await debtReminderRepo.getListOfDebtReminderUserRecive(userId)
}

export const findDebtReminderById = async (id) => {
  return await debtReminderRepo.findDebtReminderById(id)
}

export const setDebtReminderIsPayById = async (id) => {
  return await debtReminderRepo.setDebtReminderIsPayById(id)
}

export const deleteDebtReminderById = async (id, contentOfRemoveDebt) => {
  const result = await debtReminderRepo.deleteDebtReminderById(id, contentOfRemoveDebt)
  return result[1][0]
}
