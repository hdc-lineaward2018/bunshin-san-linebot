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
  talklist?: Talk[]
}

/**
 * AWS DynamoDB List item
 */
export interface DynamoDBListItem {
  S?: string
  BOOL?: boolean
  N?: number
  B?: string
}

/**
 * Talk model
 */
export interface Talk extends DynamoDBListItem {}
