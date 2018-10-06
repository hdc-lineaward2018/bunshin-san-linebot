import { WebhookEvent, ReplyableEvent } from '@line/bot-sdk'
import AskUserName from './ask-user-name'
import ConfirmUserName from './confirm-user-name'
import SubmitUserName from './submit-user-name'
import SaveTalk from './save-talk'
import ShowHelp from './show-help'
import CreateNewBook from './create-new-book'
import ShowCurrentBook from './show-current-book'
import SendComebackMessage from './send-comeback-message'
import { User } from '../models'

export default (user: User, event: WebhookEvent & ReplyableEvent) => [
  new SendComebackMessage(user, event),
  new AskUserName(user, event),
  new ConfirmUserName(user, event),
  new SubmitUserName(user, event),
  new SaveTalk(user, event),
  new CreateNewBook(user, event),
  new ShowCurrentBook(user, event),
  //new ShowHelp(user, event)
]
