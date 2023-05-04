import * as dotenv from 'dotenv'

dotenv.config()

export const MONGO_URI: string =
  process.env.NODE_ENV === 'development' ? process.env.DEV_MONGO_URI : process.env.MONGODB_URI

export const PORT: string = process.env.PORT

export const API_KEY: string = process.env.API_KEY

export const JWT_SECRET = process.env.JWT_SECRET
