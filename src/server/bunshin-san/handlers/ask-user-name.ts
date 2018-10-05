import { TextMessage } from '@line/bot-sdk'
import EventHandler from './event-handler'
import Command from '../commands'

export default class AskUserName extends EventHandler {
  private get command() : Command {
    return <Command>JSON.parse(this.eventPostbackData)
  }

  /**
   * @override from EventHandler
   */
  get isReplyable() : boolean {
    return !this.hasInternalUser && (
      this.isFollowEvent() ||
      (this.isPostbackEvent() && this.command.type === 'askUserName')
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
