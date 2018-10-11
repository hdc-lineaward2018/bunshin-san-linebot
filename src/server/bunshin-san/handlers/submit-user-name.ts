import { TextMessage } from '@line/bot-sdk'
import EventHandler from './event-handler'
import Command, { SubmitUserNameCommand } from '../commands'
import Database from '../database'
import client from '../../linebot/client'
import { User } from '../models'
import logger from '../../logger'

export default class SubmitUserName extends EventHandler {
  private get command() : Command {
    return <Command>JSON.parse(this.eventPostbackData)
  }

  private get name() : string {
    return (<SubmitUserNameCommand>this.command).name
  }

  private get text() : string {
    return `${this.internalUserName}殿で名前を登録したでござる！

殿の言葉を覚えて代わりに話すでござる！
覚えさせたい言葉を伺ってもよいでござるか？`
  }

  /**
   * @override from EventHandler
   */
  get isReplyable() {
    return !this.hasInternalUser && this.isPostbackEvent() &&
      this.command.type === 'submitUserName'
  }

  /**
   * @override from EventHandler
   */
  get message() : TextMessage {
    const message: TextMessage = {
      type: 'text',
      text: this.text
    }
    return message
  }

  /**
   * @override from EventHandler
   */
  reply() : Promise<any> {
    return Database.createUser({
      lineuserid: this.event.source.userId,
      name: this.name
    }).then((user: User) : Promise<any> => {
      logger.debug(user)
      this.user = user
      return client.replyMessage(this.event.replyToken, this.message)
    })
  }
}
