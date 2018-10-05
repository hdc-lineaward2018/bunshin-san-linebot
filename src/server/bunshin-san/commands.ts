/**
 * 'type' property of Command
 */
export type CommandTypes = 'submitUserName' | 'askUserName' | 'showAllBooks'| 'selectBook' |
  'editBook' | 'newBook' | 'showCurrentBook'

/**
 * Base of postback Commands
 */
export default interface Command {
  type: CommandTypes
}

/**
 * Save Username to Database
 */
export interface SubmitUserNameCommand extends Command {
  type: 'submitUserName'
  name: string
}

/**
 * Ask Username
 */
export interface AskUserNameCommand extends Command {
  type: 'askUserName'
}

/**
 * Show all Books
 */
export interface ShowAllBooksCommand extends Command {
  type: 'showAllBooks'
}

/**
 * Select a Book
 */
export interface SelectBookCommand extends Command {
  type: 'selectBook'
  id: number
}

/**
 * Edit a Book
 */
export interface EditBookCommand extends Command {
  type: 'editBook'
  id: number
}

/**
 * Create new Book
 */
export interface NewBookCommand extends Command {
  type: 'newBook'
}

/**
 * Show selected Book
 */
export interface ShowCurrentBookCommand extends Command {
  type: 'showCurrentBook'
}
