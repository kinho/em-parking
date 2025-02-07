import 'dotenv/config'
import 'reflect-metadata'

import express from 'express'

import MongoDBConnection from '@config/mongodb'
import UserController from '@modules/user/user.controller'

const { NODE_ENV, PORT: ENV_PORT } = process.env
const PORT: number = parseInt(`${ENV_PORT}`) || 4000

;(async () => {
  console.info()
  await MongoDBConnection.connect()

  console.info('⏳  Starting server...')

  const app = express()
  app.use(express.json())

  app.get('/', (_, res) => { res.send('EM-Parking API') })
  app.use('/user', UserController)

  app.listen(PORT)
  console.info(`🚀  Server ready at http://localhost:${PORT}/ on ${NODE_ENV}`)
})()
