import express, { Request, Response } from 'express'

import mongoose from 'mongoose'
import { MONGO_URI } from './utils/config'
import { info, error } from './utils/logger'
import router from './routes'
import compression from 'compression'
import bodyParser from 'body-parser'
import { unknownEndpoint } from './utils/middleware'

const app = express()

info('connecting to', MONGO_URI)

app.use(compression())
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to QuickDo Test API by Daydy Dev version 1.0.0' })
})
app.use('/api', router())

mongoose
  .connect(MONGO_URI)
  .then((result) => info('connected to MongoDB'))
  .catch((err) => error('error connecting to MongoDB', err.message))

app.use(unknownEndpoint)

export default app
