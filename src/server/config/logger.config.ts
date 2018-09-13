export default {
  appenders: {
    default: {
      type: 'console'
    }
  },
  categories: {
    default: {
      appenders: [
        'default'
      ],
      level: 'debug'
    }
  }
}
