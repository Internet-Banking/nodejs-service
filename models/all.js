import Users from './user'
import Accounts from './account'
import Admins from './admin'
import Employees from './employee'
import AccountCharges from './account_charge'

import RecipientAccounts from './recipient_account'
import OuterRecipientAccounts from './outer_recipient_accounts'

import InnerTransactions from './inner_transactions'
import OuterTransactions from './outer_transactions'

import PartnerRequestLogs from './partner_request_logs'
import PartnerResponseLogs from './partner_response_logs'

import OTP from './otp'

Users.hasMany(Accounts, {foreignKey: 'userId'})
Accounts.belongsTo(Users, {foreignKey: 'userId'})

AccountCharges.belongsTo(Accounts, {foreignKey: 'accountId'})

RecipientAccounts.belongsTo(Users, {foreignKey: 'userId'})
RecipientAccounts.belongsTo(Accounts, {foreignKey: 'accountId'})
OuterRecipientAccounts.belongsTo(Users, {foreignKey: 'userId'})

InnerTransactions.belongsTo(Accounts, {foreignKey: 'sendingAccountId'})
InnerTransactions.belongsTo(Accounts, {foreignKey: 'receivingAccountId'})

OuterTransactions.belongsTo(Accounts, {foreignKey: 'sendingAccountId'})

export default {
  Users,
  Accounts,
  Admins,
  Employees,
  AccountCharges,
  RecipientAccounts,
  OuterRecipientAccounts,
  InnerTransactions,
  OuterTransactions,
  PartnerRequestLogs,
  PartnerResponseLogs,
  OTP
}
