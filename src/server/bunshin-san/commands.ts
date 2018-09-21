/**
 * Base of postback Commands
 */
export interface Command {
  command: string
}

/**
 * Show all Books
 */
export interface ShowAllBooks extends Command {
  command: 'showAllBooks'
}

/**
 * Select a Book
 */
export interface SelectBook extends Command {
  command: 'selectBook',
  id: number
}

/**
 * Edit a Book
 */
export interface EditBook extends Command {
  command: 'editBook',
  id: number
}

/**
 * Create new Book
 */
export interface NewBook extends Command {
  command: 'newBook'
}

/**
 * Show selected Book
 */
export interface ShowCurrentBook extends Command {
  command: 'showCurrentBook'
}

/**
 * Create new Section
 */
export interface NewSection extends Command {
  command: 'newSection'
}

/**
 * Edit selected Section
 */
export interface EditSection extends Command {
  command: 'editSection',
  id: number
}
