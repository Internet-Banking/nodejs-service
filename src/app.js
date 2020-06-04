import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import yamljs from 'yamljs'
import swaggerUi from 'swagger-ui-express'

import partnerRoute from './catalog/partner/partner.route'
import adminRoute from './catalog/admin/admin.route'
import employeeRoute from './catalog/employee/employee.route'
import userRoute from './catalog/user/user.route'
import accountRoute from './catalog/account/account.route'

import {ADMIN_FRONTEND_URL, CUSTOMER_FRONTEND_URL, EMPLOYEE_FRONTEND_URL} from './config'

const app = express()
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({
  extended: true
})) //true -> support parsing extended body with rich data/ false
// -> only support simple body with url encoded data
app.use(bodyParser.json())
//Prevent all domain from sending request except this one
app.use(cors({
  origin: [
    ADMIN_FRONTEND_URL,
    CUSTOMER_FRONTEND_URL,
    EMPLOYEE_FRONTEND_URL
  ], //add partner team's domains here
  credentials: true //Turn on cookie HTTP through CORS
}))

const swaggerDocs = yamljs.load('./openapi.yaml')
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/partner', partnerRoute)
app.use('/admin', adminRoute)
app.use('/employee', employeeRoute)
app.use('/user', userRoute)
app.use('/account', accountRoute)

//handling 'Not found' error
//if the url does not match any above route => not found error
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

export default app
