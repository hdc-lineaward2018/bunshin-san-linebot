import { Router, Request, Response } from 'express'
import { EventBase, WebhookEvent, ReplyableEvent, PostbackEvent, MessageEvent } from '@line/bot-sdk'
import { generateGeneralMenu } from '../bunshin-san/messages'
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

  request.body.events.forEach((event: WebhookEvent) => {
    if(isReplyable(event)) {
      logger.debug(`Requested user is ${event.source.userId} .`)
      Database.getUser({
        table: 'user',
        lineUserId: event.source.userId
      }).then((user: User) => {
        if(isPostback(event)) {
          client.replyMessage(event.replyToken, generateGeneralMenu())
        }
        else if(isMessage(event)) {
          client.replyMessage(event.replyToken, generateGeneralMenu())
        }
      })
    }
  })

  return response.sendStatus(200)
})

export default router
