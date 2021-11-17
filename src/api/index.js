/* eslint global-require: 0 */

// IMPORTS
// ==============================================
import mongoose from 'mongoose'
import moment from 'moment-timezone'
import http from 'http'
import express from 'express'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import winston, { format } from 'winston'
// import { ElasticsearchTransport } from 'winston-elasticsearch'

// import Errors from '@utils/errors'
// import loggerformat from '@utils/loggers'
// import initModels from '@models/init'
// import timestamps from '@utils/mongoose/timestamps'
import { databases } from '@shared/config'

const PORT = process.env.PORT || 3002

mongoose.Promise = global.Promise
// mongoose.plugin(timestamps)
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

// Diffusion des erreurs en global
// global.ValidationError = Errors.ValidationError
// global.NotFoundError = Errors.NotFoundError
// global.ServiceError = Errors.ServiceError
// global.CatchError = Errors.CatchError

const start = async () => {
  try {
    // Initialisation des connexions
    // const mongoDev = await mongoose.createConnection(databases.mongoDev.host, databases.mongoDev.options)
    // const mongoApps = await mongoose.createConnection(databases.mongoApps.host, databases.mongoApps.options)
    // const redisApps = await redis.createClient(databases.redis)
    // const elasticsearch = new Client(databases.elasticsearch)

    global.connections = {
      // mongoDev,
      // mongoApps
    }

    // global.logger = logger

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
      // logger.info(`Server starts on port ${PORT}`, {
      //   tags: ['server', 'starts']
      // })
    })

    if (process.send) {
      process.send('ready')
    }

    // process.on('SIGINT', async () => {
    //   // await mongoDev.close()
    //   // await mongoApps.close()
    //   // await redisApps.quit()
    //   // logger.end()

    //   process.exit(0)
    // })
  } catch (error) {
    console.error(error)
    // logger.error('Server closed', {
    //   tags: ['server', 'closed'],
    //   error: error.message
    // })
  }
}

start()
