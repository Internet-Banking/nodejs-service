import Users from './user'
import Accounts from './accounts'

Accounts.belongsTo(Users, { foreignKey: 'userId' })

export default {
  Users,
  Accounts
}
