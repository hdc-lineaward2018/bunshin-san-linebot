import { FlexMessage } from '@line/bot-sdk'
import EventHandler from './event-handler'
import { NewBookCommand, ShowCurrentBookCommand } from '../commands'
import Database from '../database'
import client from '../../linebot/client'

export default class SaveTalk extends EventHandler {
  private get showCurrentBookCommand() : ShowCurrentBookCommand {
    return {type: 'showCurrentBook'}
  }

  private get newBookCommand() : NewBookCommand {
    return {type: 'newBook'}
  }

  /**
   * @override from EventHandler
   */
  get isReplyable() {
    return this.hasInternalUser && this.isMessageEvent()
  }

  /**
   * @override from EventHandler
   */
  get message() {
    const message: FlexMessage = {
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
                type: 'postback',
                label: '現在の巻物を見る',
                displayText: '現在の巻物を見る',
                data: JSON.stringify(this.showCurrentBookCommand)
              },
              style: 'primary'
            },
            {
              type: 'button',
              action: {
                type: 'postback',
                label: '新しい巻物',
                displayText: '新しい巻物',
                data: JSON.stringify(this.newBookCommand)
              },
              style: 'primary'
            }
          ]
        }
      }
    }
    return message
  }

  /**
   * @override from EventHandler
   */
  reply() : Promise<any> {
    return Database.createTalks(
      this.user.lineuserid,
      this.user.editbookid,
      [
        {'S': this.eventMessageText}
      ]
    ).then(() => {
      return client.replyMessage(this.event.replyToken, this.message)
    })
  }
}