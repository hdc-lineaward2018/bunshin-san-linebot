import { IncomingMessage } from 'http'
import { request, RequestOptions } from 'https'
import { URLSearchParams, parse } from 'url'
import { HTTPError } from '@line/bot-sdk'
import { GetUserRequest, GetParams } from './requests'
import Response, { GetUserResponse, ErrorResponse } from './response'
import { User, Book, Section, Talk } from './models'
import { DatabaseError } from './errors'
import config from '../config/database.config'
import logger from '../logger'

export default class Database {
  static buildURLParams(params: GetParams) : string {
    return new URLSearchParams(params).toString()
  }

  static async request(data?: any, options?: RequestOptions) : Promise<Response> {
    return new Promise((resolve: (value: Response) => void, reject: (reason: Error) => void) : void => {
      const opt: RequestOptions = Object.assign({}, config, options)
      const req = request(opt, (response: IncomingMessage) : void => {
        logger.debug(`Response status ${response.statusCode}`)

        // resume receiving response if error
        if(response.statusCode >= 400) {
          response.resume()
          reject(new HTTPError('Raise error while sending request to database', response.statusCode, response.statusMessage, null))
          return
        }

        // redirect
        if(response.statusCode === 302) {
          this.request(null, parse(response.headers.location)).then((res: Response) => {
            resolve(res)
          }).catch((reason: Error) => {
            reject(reason)
          })
          return
        }

        let data = ''

        // receive response body stream
        response.on('data', (chunkedData: string) : void => {
          data += chunkedData
        })

        // complete to recive response body
        response.on('end', () : void => {
          logger.debug(`DB Response ended .`)
          logger.debug(`Responsed data: ${data}`)
          try {
            resolve(<Response>JSON.parse(data))
          }
          catch(error) {
            reject(error)
          }
        })

        // handle error
        response.on('error', (error: Error) : void => reject(error))
      })

      req.on('error', (error: Error) : void => reject(error))

      if(data) req.write(JSON.stringify(data), (error: Error) => reject(error))

      req.end(() => logger.debug(`Finish sending request to ${config.hostname}.`))
    })
  }

  static async get(data?: GetParams, options?: RequestOptions) : Promise<Response> {
    const query = this.buildURLParams(data)
    const opt = Object.assign({}, options, {method: 'GET', query})
    return this.request(null, opt)
  }

  static async post(data?: any, options?: RequestOptions) : Promise<Response> {
    const opt = Object.assign({}, options, {method: 'POST'})
    return this.request(data, opt)
  }

  static async getUser(params: GetUserRequest) : Promise<User> {
    return this.get(params).then((data: Response) => {
      return new Promise((resolve: (value: User) => void, reject: (reason: Error) => void) : void => {
        if(data.success) {
          resolve((<GetUserResponse>data).result)
        }
        else {
          reject(new DatabaseError(<ErrorResponse>data))
        }
      })
    })
  }

  //static async createUser(params: CreateUsers) : Promise<User[]> {}

  //static async createBooks(params: CreateBooks) : Promise<Book[]> {}

  //static async createSections(params: CreateSections) : Promise<Section[]> {}

  //static async createTalks(params: CreateTalks) : Promise<Talk[]> {}
}
