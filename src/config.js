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
export const ADMIN_FRONTEND_URL = process.env.ADMIN_FRONTEND_URL || 'http://localhost:3003'

export const SALT_ROUNDS = process.env.SALT_ROUNDS
export const JWT_SECRET = process.env.JWT_SECRET
export const TOKEN_EXPIRED_TIME = process.env.TOKEN_EXPIRED_TIME

//used to sign in request sent to partner
export const RSA_PRIVATE_KEY = process.env.RSA_PRIVATE_KEY.replace(/\\n/g, '\n')
export const PGP_PRIVATE_KEY = process.env.PGP_PRIVATE_KEY.replace(/\\n/g, '\n')

//send this to partners
export const RSA_PUBLIC_KEY = process.env.RSA_PUBLIC_KEY.replace(/\\n/g, '\n')
export const PGP_PUBLIC_KEY = process.env.PGP_PUBLIC_KEY.replace(/\\n/g, '\n')
export const HASH_SECRET = process.env.HASH_SECRET

//partners gave us
export const PGP_PARTNER_URL = process.env.PGP_PARTNER_URL
export const PGP_PARTNER_BASIC_AUTH_USERNAME = process.env.PGP_PARTNER_BASIC_AUTH_USERNAME
export const PGP_PARTNER_BASIC_AUTH_PASSWORD = process.env.PGP_PARTNER_BASIC_AUTH_PASSWORD
export const PGP_PARTNER_HASH_SECRET = process.env.PGP_PARTNER_HASH_SECRET
export const PGP_PARTNER_PUBLIC_KEY = process.env.PGP_PARTNER_PUBLIC_KEY.replace(/\\n/g, '\n')

export const RSA_PARTNER_SECRET_CODE = process.env.RSA_PARTNER_SECRET_CODE
export const RSA_PARTNER_PUBLIC_KEY = process.env.RSA_PARTNER_PUBLIC_KEY.replace(/\\n/g, '\n')

//partnerCode in partner's request
export const PARTNER_CODE_RSA = process.env.PARTNER_CODE_RSA
export const PARTNER_CODE_PGP = process.env.PARTNER_CODE_PGP

export const PARTNER_REQUEST_EXPIRED_TIME = 60000 //60s
