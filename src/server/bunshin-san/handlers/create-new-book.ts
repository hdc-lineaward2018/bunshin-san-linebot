import { TextMessage } from '@line/bot-sdk'
import EventHandler from './event-handler'
import Database from '../database'
import { Book, User } from '../models'
import client from '../../linebot/client'

export default class CreateNewBook extends EventHandler {
  private book: Book

  /**
   * @override from EventHandler
   */
  get isReplyable() : boolean {
    return this.hasInternalUser && this.isCommandType('newBook')
  }

  /**
   * @override from EventHandler
   */
  get message() : TextMessage {
    const message: TextMessage = {
      type: 'text',
      text: '新しい巻物を用意したでござる！'
    }
    return message
  }

  /**
   * @override from EventHandler
   */
  reply() {
    return Database.createBook(this.eventUserId).then((book: Book) => {
      this.book = book
      return Database.updateUser(this.eventUserId, {
        currentbookid: book.bookid,
        editbookid: book.bookid
      })
    }).then((user: User) => {
      this.user = user
      return client.replyMessage(this.event.replyToken, this.message)
    })
  }
}
