import { User, Book, Section, Talk } from './models'

export default interface Response {
  param: any
  success: boolean
  result: string | User | Book | Section | Section[] | Talk | Talk[]
}

export interface ErrorResponse extends Response {
  success: false
  result: string
}

export interface GetUserResponse extends Response {
  success: true
  result: User
}
