import WrappedError from './wrapped-error'

export default class HTTPError extends WrappedError {
  readonly response: any

  constructor(message: string, response?: any) {
    super(message)
    this.response = response
  }
}
