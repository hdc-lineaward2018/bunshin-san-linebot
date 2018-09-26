import { User, Book, Section, Talk } from './models'

export interface DatabaseRequest {
  searchTarget: 'user' | 'book' | 'section' | 'talk'
}

export interface CreateRecordsRequest extends DatabaseRequest {
  records: User[] | Book[] | Section[] | Talk[]
}

export interface CreateUsersRequest extends CreateRecordsRequest {
  searchTarget: 'user'
  records: User[]
}

export interface CreateBooksRequest extends CreateRecordsRequest {
  searchTarget: 'book'
  records: Book[]
}

export interface CreateSectionsRequest extends CreateRecordsRequest {
  searchTarget: 'section'
  records: Section[]
}

export interface CreateTalksRequest extends CreateRecordsRequest {
  searchTarget: 'talk'
  records: Talk[]
}

export interface GetParams {
  [key: string] : string | string[]
}

export interface GetUserRequest extends GetParams, DatabaseRequest {
  searchTarget: 'user'
  lineUserId: string
}
