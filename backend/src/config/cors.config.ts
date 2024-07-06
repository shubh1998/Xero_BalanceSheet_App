const whitelist: any = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002']

const corsOptions: any = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

export default corsOptions
