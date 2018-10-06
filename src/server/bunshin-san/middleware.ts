import { Request, Response } from 'express'
import { EventBase, WebhookEvent, ReplyableEvent } from '@line/bot-sdk'
import Database from './database'
import { User } from './models'
import EventHandler from './handlers/event-handler'
import generateHandlers from './handlers/generate-handlers'
import logger from '../logger'
import WrappedError from '../errors/wrapped-error'
import HTTPError from '../errors/http-error'
import { ErrorResponse } from './responses'

export const hasEvents = (request: Request) : boolean => {
  return request.body && request.body.events && request.body.events.length > 0
}

export const isReplyable = (event: EventBase) : event is ReplyableEvent => {
  return !!(<ReplyableEvent>event).replyToken
}

export default (request: Request, response: Response) => {
  if(!hasEvents(request)) return response.sendStatus(200)

  Promise.all(request.body.events.map((event: WebhookEvent) : Promise<boolean> => {
    logger.info(`Requested LINE UserID: ${event.source.userId}`)

    if(!isReplyable(event)) {
      logger.debug(`This event can not reply: ${event}`)
      return Promise.resolve(true)
    }

    return Database.getUser(event.source.userId).then((user: User) : Promise<any> => {
      logger.debug(`Internal user: ${user}`)

      return Promise.all(generateHandlers(user, event).map((handler: EventHandler) : Promise<any> => {
        if(!handler.isReplyable) {
          logger.debug(`${handler.constructor.name}Handler is nothing to do .`)
          return
        }

        logger.debug(`Execute ${handler.constructor.name}Handler .`)

        return handler.reply().catch((error: WrappedError) => {
          if(error instanceof HTTPError) {
            logger.error(`Raise ${error.name}: ${JSON.stringify(<ErrorResponse>error.response)}`)
          }
          else if(error.originalError) {
            logger.error(`Raise ${error.originalError.name}: ${error.originalError.stack}`)
            logger.error(`OriginalError message: ${error.originalError.response.data.massage}`)
          }
          else {
            logger.error(`Raise ${error.name}: ${error.stack}`)
          }

          return Promise.reject(error)
        })
      }))
    }).then(() : Promise<boolean> => {
      return Promise.resolve(true)
    }).catch((error: Error) : Promise<boolean> => {
      if(error) logger.error(`Raise ${error.name}: ${error.stack}`)
      return Promise.resolve(false)
    })
  })).then((results: any[]) : void => {
    logger.info(`Succeed to respond ${results.filter(result => result).length} / ${results.length} events .`)
    logger.info(`Failed to respond ${results.filter(result => !result).length} / ${results.length} events .`)
  }).catch((error: Error) : void => {
    logger.error(`Unhandled ${error.name}: ${error.stack}`)
  })

  return response.sendStatus(200)
}
