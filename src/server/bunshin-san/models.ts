/**
 * Base of models
 */
export interface Model {
}

/**
 * User model
 */
export interface User extends Model {
  lineuserid: string
  name: string
  currentbookid?: string
  editbookid?: string
}

/**
 * Book model
 */
export interface Book extends Model {
  lineuserid?: string
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
