import Users from './user'
import Accounts from './account'
import Admins from './admin'
import Employees from './employee'
import AccountCharges from './account_charge'

Accounts.belongsTo(Users, {foreignKey: 'userId'})
AccountCharges.belongsTo(Accounts, {foreignKey: 'accountId'})

export default {
  Users,
  Accounts,
  Admins,
  Employees,
  AccountCharges
}
