import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import userRoute from './catalog/user/user.route'

const app = express()
app.use(morgan('[:date[clf]] :method :url :status :response-time ms - :res[content-length]'))

app.use(bodyParser.urlencoded({
  extended: true
})) //true -> support parsing extended body with rich data/ false
// -> only support simple body with url encoded data
app.use(bodyParser.json())
//Prevent all domain from sending request except this one
app.use(cors({
  origin: [], //add partner team's domains here
  credentials: true //Turn on cookie HTTP through CORS
}))

app.use('/user', userRoute)

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
