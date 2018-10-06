export default class WrappedError extends Error {
  readonly originalError?: any

  constructor(message: string, originalError?: any) {
    super(message)
    this.originalError = originalError
  }
}
