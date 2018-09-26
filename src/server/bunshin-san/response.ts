import { User, Book, Section, Talk } from '../bunshin-san/models'
import { FlexCarousel } from '@line/bot-sdk';

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
