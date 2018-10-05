import { FlexMessage, TextMessage } from '@line/bot-sdk'
import EventHandler from './event-handler'
import Database from '../database'
import { Book, Talk } from '../models'
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
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: this.book.talklist.map((talk: Talk) : TextMessage => {
            return {
              type: 'text',
              text: talk.S
            }
          })
        }
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
