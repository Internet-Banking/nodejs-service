import dotenv from 'dotenv'
dotenv.config()

export const PORT = Number(process.env.PORT) || 3000

export const DB_HOST = process.env.DB_HOST || '127.0.0.1'
export const DB_PORT = Number(process.env.DB_PORT) || 5432
export const DB_USERNAME = process.env.DB_USERNAME || ''
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_NAME = process.env.DB_NAME || 'internetBanking'

export const CUSTOMER_FRONTEND_URL = process.env.CUSTOMER_FRONTEND_URL || 'http://localhost:3001'
export const EMPLOYEE_FRONTEND_URL = process.env.EMPLOYEE_FRONTEND_URL || 'http://localhost:3002'
export const ADMIN_FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3003'

export const SALT_ROUNDS = process.env.SALT_ROUNDS
export const JWT_SECRET = process.env.JWT_SECRET
export const TOKEN_EXPIRED_TIME = process.env.TOKEN_EXPIRED_TIME

//used to send mail from @sendgrid/mail
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
export const SENDGRID_SENDER_EMAIL = 'team29internetbanking@gmail.com'
export const OTP_MAIL_SUBJECT = '[INTERNET_BANKING_29 - OTP]'

//used to sign in request sent to partner
export const RSA_PRIVATE_KEY = process.env.RSA_PRIVATE_KEY.replace(/\\n/g, '\n')
export const PGP_PRIVATE_KEY = process.env.PGP_PRIVATE_KEY.replace(/\\n/g, '\n')

//send this to partners
export const RSA_PUBLIC_KEY = process.env.RSA_PUBLIC_KEY.replace(/\\n/g, '\n')
export const PGP_PUBLIC_KEY = process.env.PGP_PUBLIC_KEY.replace(/\\n/g, '\n')
export const HASH_SECRET = process.env.HASH_SECRET

//partners gave us
export const RSA_PARTNER_PUBLIC_KEY = process.env.RSA_PARTNER_PUBLIC_KEY.replace(/\\n/g, '\n')
export const PGP_PARTNER_PUBLIC_KEY = process.env.PGP_PARTNER_PUBLIC_KEY.replace(/\\n/g, '\n')

//partnerCode in partner's request
export const PARTNER_CODE_RSA = process.env.PARTNER_CODE_RSA
export const PARTNER_CODE_PGP = process.env.PARTNER_CODE_PGP

export const PARTNER_REQUEST_EXPIRED_TIME = 60000 //60s

//use to verify otp
export const OTP_EXPIRED_TIME = 120000 //120s
