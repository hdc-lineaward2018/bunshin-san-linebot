import Express, { Application } from 'express'
import logger, { middleware as loggerMiddleware } from './logger'
import { connect } from 'ngrok'
import config from './config/ngrok.config'
import index from './routers/root'

const app = Express()
const port = parseInt(process.env.PORT) || 3000

app.use(loggerMiddleware)

app.use('/', index)

app.listen(port, () => {
  logger.info(`Application server listening on port ${port}!`)

  if(process.env.NODE_ENV == 'development') {
    connect(
      Object.assign({addr: port}, config)
    ).then((url: string) => {
      logger.info(`Connecting to ngrok on ${url}`)
    }).catch((error: Error) => {
      logger.error(`${error.name}: ${error.message}`)
    })
  }
})

app.on('error', (app: Application) => {
  logger.error('Error!')
})

export default app
