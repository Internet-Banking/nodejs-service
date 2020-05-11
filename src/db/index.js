import moment from 'moment'
import Sequelize from 'sequelize'
import {
  DB_HOST, DB_USERNAME,
  DB_PASSWORD, DB_NAME, DB_PORT
} from '../config'
import debug from '../utils/debug.utils'

const NAMESPACE = `DATABASE-${moment.utc().toISOString()}`
//connect postgreSQL with sequelize
const dbConnectionString = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
const sequelize = new Sequelize(dbConnectionString, {
  logging: false
})

sequelize
  .authenticate()
  .then(() => {
    debug.log(NAMESPACE, 'PostgreSQL connection has been established successfully.')
  })
  .catch((err) => {
    debug.error(NAMESPACE, 'Unable to connect to the database:', err)
  })

export {
  sequelize,
  Sequelize
}
