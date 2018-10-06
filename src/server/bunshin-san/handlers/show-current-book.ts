import { FlexMessage, FlexText, FlexBubble } from '@line/bot-sdk'
import EventHandler from './event-handler'
import Database from '../database'
import { Book } from '../models'
import client from '../../linebot/client'

export default class ShowCurrentBook extends EventHandler {
  private book: Book

  /**
   * @override from EventHandler
   */
  get isReplyable() : boolean {
    return this.hasInternalUser && this.isCommandType('showCurrentBook')
  }

  /**
   * @override from EventHandler
   */
  get message() : FlexMessage {
    const message: FlexMessage = {
      type: 'flex',
      altText: '現在の巻物',
      contents: {
        type: 'bubble',
        header: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '現在の巻物'
            }
          ]
        }
      }
    }

    if(this.book.talklist && this.book.talklist.length > 0) {
      (<FlexBubble>message.contents).body = {
        type: 'box',
        layout: 'vertical',
        contents: this.book.talklist.map((talk: string) : FlexText => {
          return {
            type: 'text',
            text: talk,
            wrap: true
          }
        })
      }
    }
    else {
      (<FlexBubble>message.contents).body = {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'この巻物はまだ白紙でござる'
          }
        ]
      }
    }

    return message
  }

  /**
   * @override from EventHandler
   */
  reply() {
    return Database.getBook(this.eventUserId, this.editBookId).then((book: Book) => {
      this.book = book
      return client.replyMessage(this.event.replyToken, this.message)
    })
  }
}
