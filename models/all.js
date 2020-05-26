import Users from './user'
import Accounts from './account'
import Admins from './admins'
import Employees from './employees'

Accounts.belongsTo(Users, { foreignKey: 'userId' })

export default {
  Users,
  Accounts,
  Admins,
  Employees
}
