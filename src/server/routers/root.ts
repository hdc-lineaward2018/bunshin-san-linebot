import { Router, Request, Response } from 'express'
import { EventBase, ReplyableEvent } from '@line/bot-sdk'
import client from '../linebot/client'
import middleware from '../linebot/middleware'

const hasEvents = (request: Request) : boolean => {
  return request.body && request.body.events && request.body.events.length > 0
}

const isReplyable = (event: EventBase) : event is ReplyableEvent => {
  return !!(<ReplyableEvent>event).replyToken
}

const router = Router()

router.get('/', (request: Request, response: Response) => {
  return response.send('Hello world.')
})

router.post('/', middleware, (request: Request, response: Response) => {
  if(hasEvents(request)) {
    request.body.events.forEach((event: EventBase) => {
      if(isReplyable(event)) {
        client.replyMessage(event.replyToken, {
          type: 'text',
          text: 'Hello world'
        })
      }
    });
  }

  return response.sendStatus(200)
})

export default router
