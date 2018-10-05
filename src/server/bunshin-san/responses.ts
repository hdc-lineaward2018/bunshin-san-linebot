import { Model, User, Book } from './models'

export default interface Response {}

export interface ErrorResponse extends Response {
  ErrorMessage: string
  Parameter: any
}

export interface SuccessResponse extends Response {}

export interface CreateResourceResponse extends SuccessResponse {
  [modelName: string]: Model
}

export interface CreateUserResponse extends CreateResourceResponse {
  User: User
}

export interface CreateBookResponse extends CreateResourceResponse {
  Book: Book
}

export interface GetResourcesResponse extends SuccessResponse {
  Count: number
  ScannedCount: number
  Items: User[] | Book[]
}

export interface GetUserResponse extends GetResourcesResponse {
  Items: User[]
}

export interface GetBookResponse extends GetResourcesResponse {
  Items: Book[]
}
