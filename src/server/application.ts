import Express, { Application } from 'express'
import logger, { middleware as loggerMiddleware } from './logger'
import { connect } from 'ngrok'
import errorHandler from './error-handler'
import config from './config/ngrok.config'
import index from './routers/root'

const app = Express()
const port = parseInt(process.env.PORT) || 3000
const modeIsDev = process.env.NODE_ENV !== 'production'

app.use(loggerMiddleware)
app.use('/', index)
app.use(errorHandler)

app.listen(port, () => {
  logger.info(`Application server listening on port ${port} !`)
  logger.debug(`Mode: ${process.env.NODE_ENV}`)

  if(modeIsDev) {
    connect(Object.assign({addr: port}, config)).then((url: string) => {
      logger.info(`Connecting to ngrok on ${url} !`)
    }).catch((error: Error) => {
      logger.error(`Raise ${error.name} connecting to ngrok: ${error.stack}`)
    })
  }
})

app.on('error', (app: Application) => {
  logger.error('ApplicationError!')
})

export default app
