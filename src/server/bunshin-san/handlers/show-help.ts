import { FlexMessage } from '@line/bot-sdk'
import EventHandler from './event-handler'

export default class ShowHelp extends EventHandler {
  /**
   * @override from EventHandler
   */
  get isReplyable() {
    return this.isMessageEvent() && /help|ヘルプ|たすけて|助けて/.test(this.eventMessageText)
  }

  /**
   * @override from EventHandler
   */
  get message() {
    const message: FlexMessage = {
      type: 'flex',
      altText: 'ヘルプ',
      contents: {
        type: 'bubble',
        header: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: 'ヘルプ'
            }
          ]
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: '救いはないね'
            }
          ]
        }
      }
    }
    return message
  }
}
