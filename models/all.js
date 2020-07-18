import Users from './user'
import Accounts from './account'
import Admins from './admin'
import Employees from './employee'
import AccountCharges from './account_charge'
import RecipientAccounts from './recipient_account'
import InnerTransactions from './inner_transactions'
import PartnerRequestLogs from './partner_request_logs'
import OTP from './otp'
import DebtReminders from './debt_reminder'

Users.hasMany(Accounts, {foreignKey: 'userId'})
Accounts.belongsTo(Users, {foreignKey: 'userId'})
AccountCharges.belongsTo(Accounts, {foreignKey: 'accountId'})
RecipientAccounts.belongsTo(Users, {foreignKey: 'userId'})
RecipientAccounts.belongsTo(Accounts, {foreignKey: 'accountId'})
DebtReminders.belongsTo(Users, {foreignKey: 'fromUserId'})
DebtReminders.belongsTo(Users, {foreignKey: 'toUserId'})
InnerTransactions.belongsTo(Accounts, {foreignKey: 'sendingAccountId'})
InnerTransactions.belongsTo(Accounts, {foreignKey: 'receivingAccountId'})

export default {
  Users,
  Accounts,
  Admins,
  Employees,
  AccountCharges,
  RecipientAccounts,
  DebtReminders,
  InnerTransactions,
  PartnerRequestLogs,
  OTP
}
