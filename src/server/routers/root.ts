import { Router, Request, Response } from 'express'
import { EventBase, WebhookEvent, ReplyableEvent, PostbackEvent, MessageEvent } from '@line/bot-sdk'
import { generateGeneralMenu, generateErrorMessage } from '../bunshin-san/messages'
import client from '../linebot/client'
import middleware from '../linebot/middleware'
import logger from '../logger'
import Database from '../bunshin-san/database'
import { User } from '../bunshin-san/models'

const hasEvents = (request: Request) : boolean => {
  return request.body && request.body.events && request.body.events.length > 0
}
const isReplyable = (event: EventBase) : event is ReplyableEvent => {
  return !!(<ReplyableEvent>event).replyToken
}
const isPostback = (event: WebhookEvent) : event is PostbackEvent => {
  return (<PostbackEvent>event).type === 'postback'
}
const isMessage = (event: WebhookEvent) : event is MessageEvent => {
  return (<MessageEvent>event).type === 'message'
}

const router = Router()

router.get('/', (request: Request, response: Response) => {
  return response.send('Server is running .')
})

router.post('/', middleware, (request: Request, response: Response) => {
  if(!hasEvents(request)) return response.sendStatus(200)

  Promise.all(request.body.events.map((event: WebhookEvent) : Promise<any> => {
    if(isReplyable(event)) {
      logger.debug(`Requested user is ${event.source.userId} .`)

      return Database.getUser({
        searchTarget: 'user',
        lineUserId: event.source.userId
      }).then((user: User) : Promise<any> => {
        if(isPostback(event)) {
          return client.replyMessage(event.replyToken, generateGeneralMenu(user))
        }
        else if(isMessage(event)) {
          return client.replyMessage(event.replyToken, generateGeneralMenu(user))
        }
      }).catch((error: Error) => {
        return Promise.reject(error)
      })
    }
  })).then((results: any[]) => {
    logger.info(`Succeed to respond ${results.length} events .`)
  }).catch((error: Error) => {
    logger.error(`Raise ${error.name}: ${error.stack}`)
  })

  return response.sendStatus(200)
})

export default router
