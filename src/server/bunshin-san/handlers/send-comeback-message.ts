import { TextMessage } from '@line/bot-sdk'
import EventHandler from './event-handler'

export default class SendComebackMessage extends EventHandler {
  /**
   * @override from EventHandler
   */
  get isReplyable() : boolean {
    return this.hasInternalUser && this.isFollowEvent()
  }

  /**
   * @override from EventHandler
   */
  get message() : TextMessage {
    const message: TextMessage = {
      type: 'text',
      text: `${this.internalUserName}殿、お待ちしていたでござるよ……！`
    }
    return message
  }
}
