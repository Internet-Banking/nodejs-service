import Users from './user'
import Accounts from './account'
import Admins from './admin'
import Employees from './employee'

Accounts.belongsTo(Users, {foreignKey: 'userId'})

export default {
  Users,
  Accounts,
  Admins,
  Employees
}
