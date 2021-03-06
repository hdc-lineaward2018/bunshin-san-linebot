import { TextMessage } from '@line/bot-sdk'
import EventHandler from './event-handler'

export default class AskUserName extends EventHandler {
  /**
   * @override from EventHandler
   */
  get isReplyable() : boolean {
    return !this.hasInternalUser && (
      this.isFollowEvent() || this.isCommandType('askUserName')
    )
  }

  /**
   * @override from EventHandler
   */
  get message() : TextMessage {
    const message: TextMessage = {
      type: 'text',
      text: '殿、お初にお目にかかるでござる！　お名前を伺いたいでござる！'
    }
    return message
  }
}
