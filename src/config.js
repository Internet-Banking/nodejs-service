import dotenv from 'dotenv'
dotenv.config()

export const PORT = Number(process.env.PORT) || 3000

export const DB_HOST = process.env.DB_HOST || '127.0.0.1'
export const DB_PORT = Number(process.env.DB_PORT) || 5432
export const DB_USERNAME = process.env.DB_USERNAME || ''
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_NAME = process.env.DB_NAME || 'internetBanking'

export const SALT_ROUNDS = process.env.SALT_ROUNDS
export const RSA_PRIVATE_KEY =
'-----BEGIN RSA PRIVATE KEY-----\n' + process.env.RSA_PRIVATE_KEY + '\n-----END RSA PRIVATE KEY-----'
export const RSA_PUBLIC_KEY =
'-----BEGIN PUBLIC KEY-----\n' + process.env.RSA_PUBLIC_KEY + '\n-----END PUBLIC KEY-----'
export const PARTNER_CODE_RSA = process.env.PARTNER_CODE_RSA
export const PARTNER_CODE_PGP = process.env.PARTNER_CODE_PGP
export const HASH_SECRET = process.env.HASH_SECRET
export const PARTNER_REQUEST_EXPIRED_TIME = 60000 //60s
