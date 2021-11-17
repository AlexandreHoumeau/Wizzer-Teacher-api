/* eslint global-require: 0 */

// IMPORTS
// ==============================================
import mongoose from 'mongoose'
import moment from 'moment-timezone'
import http from 'http'
import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import { databases } from '@shared/config'
import Errors from '@utils/errors'

const PORT = process.env.PORT || 3002

mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

global.ValidationError = Errors.ValidationError
global.NotFoundError = Errors.NotFoundError
global.ServiceError = Errors.ServiceError
global.CatchError = Errors.CatchError

const start = async () => {
  try {
    // Initialisation des connexions
    const mongoDev = await mongoose.createConnection(databases.mongoDev.host, databases.mongoDev.options)
    const mongoApps = await mongoose.createConnection(databases.mongoApps.host, databases.mongoApps.options)

    global.connections = {
      mongoDev,
      mongoApps
    }

    const initRouter = require('./middlewares/router').default

    // APPLICATION
    // ==============================================
    const app = express()
    const server = http.createServer(app)

    // SECURITY
    // ==============================================
    app.use(helmet())
    moment.tz.setDefault('Europe/Paris')

    // CORS
    // ==============================================
    app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }))
    app.use(bodyParser.json({ limit: '5mb' }))

    // ALLOW OPTIONS METHODS, AUTHORIZATION HEADER
    // ==============================================
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Credentials', true)
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
      res.header('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Cache-Control')
      next()
    })

    app.options('*', (req, res) => {
      res.sendStatus(200)
    })

    // ROUTER
    // ==============================================
    let router = express.Router()
    router = initRouter(router)
    app.use('/', router)

    // Init models
    // await initModels()

    server.listen(PORT, () => {
      console.log(`Server start on port ${PORT}`)
    })

    if (process.send) {
      process.send('ready')
    }
  } catch (error) {
    console.error(error)
  }
}

start()
