import { User, Book, Section, Talk } from './models'

export interface DatabaseRequest {
  table: 'user' | 'book' | 'section' | 'talk'
}

export interface CreateRecordsRequest extends DatabaseRequest {
  records: User[] | Book[] | Section[] | Talk[]
}

export interface CreateUsersRequest extends CreateRecordsRequest {
  table: 'user',
  records: User[]
}

export interface CreateBooksRequest extends CreateRecordsRequest {
  table: 'book',
  records: Book[]
}

export interface CreateSectionsRequest extends CreateRecordsRequest {
  table: 'section',
  records: Section[]
}

export interface CreateTalksRequest extends CreateRecordsRequest {
  table: 'talk',
  records: Talk[]
}

export interface GetUserRequest extends DatabaseRequest {
  table: 'user'
  lineUserId: string
}
