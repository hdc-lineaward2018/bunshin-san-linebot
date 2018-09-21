/**
 * Base of models
 */
export interface Record {
  id: number,
  lineUserId: string,
  //createdAt: string,
  //updatedAt: string
}

/**
 * User model
 */
export interface User extends Record {
  currentBookId: number,
  currentSectionId: number,
  editBookId: number,
  editSectionId: number,
  name: string
}

/**
 * Book model
 */
export interface Book extends Record {
  name: string,
  readable: boolean
}

/**
 * Section model
 */
export interface Section extends Record {
  bookId: number,
  sequence: number,
  name: string,
  readable: boolean
}

/**
 * Talk model
 */
export interface Talk extends Record {
  bookId: number,
  sectionId: number,
  text: string
}
