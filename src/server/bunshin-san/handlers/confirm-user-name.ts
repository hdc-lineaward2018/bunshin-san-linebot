import { FlexMessage } from '@line/bot-sdk'
import EventHandler from './event-handler'
import { SubmitUserNameCommand, AskUserNameCommand } from '../commands'

export default class ConfirmUserName extends EventHandler {
  private get text() : string {
    return `${this.eventMessageText}殿で間違えないでござるか？`
  }

  private get yesCommand() : SubmitUserNameCommand {
    return {
      type: 'submitUserName',
      name: this.eventMessageText
    }
  }

  private get noCommand() : AskUserNameCommand {
    return {
      type: 'askUserName'
    }
  }

  /**
   * @override from EventHandler
   */
  get isReplyable() : boolean {
    return !this.hasInternalUser && this.isMessageEvent(this.event) &&
      this.isTextMessage(this.event.message)
  }

  /**
   * @override from EventHandler
   */
  get message() : FlexMessage {
    const message: FlexMessage = {
      type: 'flex',
      altText: this.text,
      contents: {
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: this.text,
              wrap: true
            }
          ]
        },
        footer: {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'button',
              action: {
                type: 'postback',
                label: 'はい',
                displayText: 'はい',
                data: JSON.stringify(this.yesCommand)
              },
              style: 'primary'
            },
            {
              type: 'button',
              action: {
                type: 'postback',
                label: 'いいえ',
                displayText: 'いいえ',
                data: JSON.stringify(this.noCommand)
              },
              style: 'secondary'
            }
          ]
        }
      }
    }
    return message
  }
}
