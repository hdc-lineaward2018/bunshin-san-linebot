/**
 * Base of models
 */
export interface Model {
  lineuserid?: string
}

/**
 * User model
 */
export interface User extends Model {
  name?: string
  currentbookid?: string
  editbookid?: string
}

/**
 * Book model
 */
export interface Book extends Model {
  bookid?: string
  name?: string
  talklist?: string[]
}
