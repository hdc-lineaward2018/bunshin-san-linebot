import Response, { GetUserResponse, GetBookResponse, CreateUserResponse } from './responses'
import { User, Book, Talk } from './models'
import HTTP from '../http'
import config from '../config/database.config'

export default class Database {
  static async getUser(lineuserid: string) : Promise<User> {
    const path = `${config.path}/users/${lineuserid}`
    const opt = Object.assign({}, config, {path})
    return HTTP.get(opt).then((response: Response) => {
      const items = (<GetUserResponse>response).Items
      return Promise.resolve(items && items.length > 0 ? items[0] : null)
    })
  }

  static async getBooks(lineuserid: string) : Promise<Book[]> {
    const path = `${config.path}/users/${lineuserid}/books`
    const opt = Object.assign({}, config, {path})
    return HTTP.get(opt).then((response: Response) => {
      return Promise.resolve((<GetBookResponse>response).Items)
    })
  }

  static async getBook(lineuserid: string, bookid: string) : Promise<Book> {
    const path = `${config.path}/users/${lineuserid}/books/${bookid}`
    const opt = Object.assign({}, config, {path})
    return HTTP.get(opt).then((response: Response) => {
      return Promise.resolve((<GetBookResponse>response).Items[0])
    })
  }

  static async getTalks(lineuserid: string, bookid: string) : Promise<Talk[]> {
    const path = `${config.path}/users/${lineuserid}/books/${bookid}/talks`
    const opt = Object.assign({}, config, {path})
    return HTTP.get(opt).then((response: Response) => {
      return Promise.resolve((<GetBookResponse>response).Items[0].talklist)
    })
  }

  static async createUser(user: User) : Promise<User> {
    const path = `${config.path}/users`
    const opt = Object.assign({}, config, {path})
    return HTTP.post(opt, user).then((response: Response) => {
      return Promise.resolve((<CreateUserResponse>response).User)
    })
  }

  static async createBook(lineuserid: string, book?: Book) : Promise<Response> {
    const path = `${config.path}/users/${lineuserid}/books`
    const opt = Object.assign({}, config, {path})
    return HTTP.post(opt, book)
  }

  static async createTalks(lineuserid: string, bookid: string, talklist: Talk[]) : Promise<Response> {
    const path = `${config.path}/users/${lineuserid}/books/${bookid}/talks`
    const opt = Object.assign({}, config, {path})
    return HTTP.post(opt, {talklist})
  }

  static async updateUser(lineuserid: string, user: User) : Promise<User> {
    const path = `${config.path}/users/${lineuserid}`
    const opt = Object.assign({}, config, {path})
    return HTTP.post(opt, user).then((response: Response) => {
      return Promise.resolve((<CreateUserResponse>response).User)
    })
  }
}
