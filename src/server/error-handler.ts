import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import logger from './logger'

const errorHandler: ErrorRequestHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  logger.error(`Raise ${error.name}: ${error.stack}`)
  return response.sendStatus(500)
}

export default errorHandler
