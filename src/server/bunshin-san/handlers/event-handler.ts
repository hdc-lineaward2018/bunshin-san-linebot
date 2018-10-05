import {
  WebhookEvent, ReplyableEvent, PostbackEvent, MessageEvent, FollowEvent,
  Message, EventMessage, TextEventMessage
} from '@line/bot-sdk'
import { User } from '../models'
import Command, { CommandTypes } from '../commands'
import client from '../../linebot/client'

export default abstract class EventHandler {
  protected user: User
  protected event: ReplyableEvent & WebhookEvent

  constructor(user: User, event: ReplyableEvent & WebhookEvent) {
    this.user = user
    this.event = event
  }

  protected isPostbackEvent(event: ReplyableEvent & WebhookEvent = this.event) : event is PostbackEvent {
    return event.type === 'postback'
  }

  protected isMessageEvent(event: ReplyableEvent & WebhookEvent = this.event) : event is MessageEvent {
    return event.type === 'message'
  }

  protected isFollowEvent(event: ReplyableEvent & WebhookEvent = this.event) : event is FollowEvent {
    return event.type === 'follow'
  }

  protected isTextMessage(message: EventMessage) : message is TextEventMessage {
    return message.type === 'text'
  }

  protected get eventUserId() : string {
    return this.event.source.userId
  }

  protected get eventMessageText() : string {
    return this.isMessageEvent(this.event) && this.isTextMessage(this.event.message) ?
      this.event.message.text : null
  }

  protected get eventPostbackData() : string {
    return this.isPostbackEvent(this.event) ? this.event.postback.data : null
  }

  protected get postbackCommand() : Command {
    return this.isPostbackEvent() ? <Command>JSON.parse(this.eventPostbackData) : null
  }

  protected isCommandType(type: CommandTypes) : boolean {
    return this.postbackCommand.type === type
  }

  protected get hasInternalUser() : boolean {
    return !!this.user
  }

  protected get internalUserId() : string {
    return this.hasInternalUser ? this.user.lineuserid : null
  }

  protected get currentBookId() : string {
    return this.hasInternalUser ? this.user.currentbookid : null
  }

  protected get editBookId() : string {
    return this.hasInternalUser ? this.user.editbookid : null
  }

  protected get internalUserName() : string {
    return this.hasInternalUser ? this.user.name : null
  }

  abstract get message() : Message | Message[]

  abstract get isReplyable() : boolean

  reply() : Promise<any> {
    return client.replyMessage(this.event.replyToken, this.message)
  }
}
