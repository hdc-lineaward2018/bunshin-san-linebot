import Express, { Application } from 'express'
import logger, { middleware as loggerMiddleware } from './logger'
import { connect, INgrokOptions } from 'ngrok'
import config from './config/ngrok.config'
import index from './routers/root'

const app = Express()
const port = parseInt(process.env.PORT) || 3000

app.use(loggerMiddleware)

app.use('/', index)

app.listen(port, () => {
  logger.info(`Application server listening on port ${port}!`)
  logger.debug(process.env.NODE_ENV)

  if(process.env.NODE_ENV === 'development') {
    const c: INgrokOptions = Object.assign({addr: port}, config)
    logger.debug(c)
    connect(c).then((url: string) => {
      logger.info(`Connecting to ngrok on ${url}`)
    }).catch((error: Error) => {
      logger.error(`${error.name}: ${error.message}`)
    })
  }
})

app.on('error', (app: Application) => {
  logger.error('ApplicationError!')
})

export default app
