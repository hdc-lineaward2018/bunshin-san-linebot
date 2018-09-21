import { User, Book, Section, Talk } from '../bunshin-san/models'

export default interface Response {
  param: any,
  success: boolean,
  result: string | User | Book | Section | Section[] | Talk | Talk[]
}
