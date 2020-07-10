import Models from '../../../models/all'

export const createDebtReminder = async (fromUserId, toUserId, debtAmount, contentOfDebt) => {
  return await Models.DebtReminders.create({fromUserId, toUserId, debtAmount, contentOfDebt})
}

export const getListOfDebtReminderUserSent = async (userId, raw = true) => {
  return await Models.DebtReminders.findAll({where: {fromUserId: userId, isDeleted: false}, raw})
}

export const getListOfDebtReminderUserRecive = async (userId, raw = true) => {
  return await Models.DebtReminders.findAll({where: {toUserId: userId, isDeleted: false}, raw})
}
