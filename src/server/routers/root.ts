import { Router, Request, Response } from 'express'
import { EventBase, ReplyableEvent, FlexMessage } from '@line/bot-sdk'
import client from '../linebot/client'
import middleware from '../linebot/middleware'

const hasEvents = (request: Request) : boolean => {
  return request.body && request.body.events && request.body.events.length > 0
}

const isReplyable = (event: EventBase) : event is ReplyableEvent => {
  return !!(<ReplyableEvent>event).replyToken
}

const generateMenuMessage = () : FlexMessage => {
  return {
    type: 'flex',
    altText: '指令の書',
    contents: {
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '指令の書'
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            action: {
              type: 'message',
              label: '現在の巻物を見る',
              text: '現在の巻物を見る'
            }
          },
          {
            type: 'button',
            action: {
              type: 'message',
              label: '新しい巻物',
              text: '新しい巻物'
            }
          },
          {
            type: 'button',
            action: {
              type: 'message',
              label: '次の章',
              text: '次の章'
            }
          },
        ]
      }
    }
  }
}

const router = Router()

router.get('/', (request: Request, response: Response) => {
  return response.send('Hello world.')
})

router.post('/', middleware, (request: Request, response: Response) => {
  if(hasEvents(request)) {
    request.body.events.forEach((event: EventBase) => {
      if(isReplyable(event)) {
        client.replyMessage(event.replyToken, generateMenuMessage())
      }
    });
  }

  return response.sendStatus(200)
})

export default router
