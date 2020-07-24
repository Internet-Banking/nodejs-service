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

export const findDebtReminderById = async (id, raw = true) => {
  return await Models.DebtReminders.findOne({where: {id, isDeleted: false}, raw})
}

export const setDebtReminderIsPayById = async (id) => {
  return await Models.DebtReminders.update(
    {
      isPay: true
    },
    {
      where: {id, isDeleted: false}
    }
  )
}

export const deleteDebtReminderById = async (id, contentOfRemoveDebt, returning = true) => {
  return await Models.DebtReminders.update(
    {
      isDeleted: true,
      contentOfRemoveDebt
    },
    {
      where: {id, isDeleted: false},
      returning
    }
  )
}
