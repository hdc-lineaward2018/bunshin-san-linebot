import { request, IncomingMessage, RequestOptions } from 'http'
import { URLSearchParams } from 'url'
import { GetUserRequest } from './requests'
import { User, Book, Section, Talk } from './models'
import logger from '../logger'

export const ENDPOINT = process.env.DATABASE_ENDPOINT

export default class Database {
  static buildURLParams(params: { [key: string]: string | string[] }) : string {
    return new URLSearchParams(params).toString()
  }

  static buildURL(endpoint: string, params: { [key: string]: string | string[] }) : string {
    return `${endpoint}?${this.buildURLParams(params)}`
  }

  static async request(url: string, data?: any, options?: RequestOptions) : Promise<any> {
    return new Promise((resolve: (value: any) => void, reject: (reason: Error) => void) => {
      const r = request(url, options, (response: IncomingMessage) => {
        let data = ''
        response.on('data', (chunkedData: string) => data += chunkedData)
        response.on('end', () => {
          logger.debug(`DB Response ended .`)
          logger.debug(`Responsed data: ${data}`)
          try {
            resolve(JSON.parse(data))
          }
          catch(error) {
            logger.error(`Raise ${error.name} when parse request body: ${error.message}`)
            reject(error)
          }
        })
        response.on('error', (error: Error) => {
          logger.error(`Raise ${error.name} when receive response: ${error.message}`)
          reject(error)
        })
      }).on('error', (error: Error) => {
        logger.error(`Raise ${error.name} when send request: ${error.message}`)
        reject(error)
      })
      r.write(data)
      r.end()
    })
  }

  static async get(url: string, data?: {[key: string] : string | string[]}, options?: RequestOptions) : Promise<any> {
    const u = this.buildURL(url, data)
    const o = Object.assign({}, options, {method: 'GET'})
    return this.request(u, null, o)
  }

  static async post(url: string, data?: any, options?: RequestOptions) : Promise<any> {
    const o = Object.assign({}, options, {method: 'POST'})
    return this.request(url, data, o)
  }

  //static async createUser(params: CreateUsers) : Promise<User[]> {}

  //static async createBooks(params: CreateBooks) : Promise<Book[]> {}

  //static async createSections(params: CreateSections) : Promise<Section[]> {}

  //static async createTalks(params: CreateTalks) : Promise<Talk[]> {}

  static async getUser(params: GetUserRequest) : Promise<User> {
    return this.get(ENDPOINT, params)
  }
}
