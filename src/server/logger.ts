import { configure, getLogger, connectLogger } from 'log4js'
import config from './config/logger.config'

configure(config)

const logger = getLogger('default')
export const middleware = connectLogger(logger, {level: 'debug'})

export default logger
