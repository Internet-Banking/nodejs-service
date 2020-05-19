import Users from './user'
import Accounts from './account'

Accounts.belongsTo(Users, { foreignKey: 'userId' })

export default {
  Users,
  Accounts
}
