import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router()

app.disable('x-powered-by')

// ********** MIDDLEWARE - start ********** //

// CORS enables our server
app.use(cors())
// json nice parses our body
app.use(json())
// urlencoded adds params to our URL
app.use(urlencoded({ extended: true }))
// Morgan improves our logs
app.use(morgan('dev'))

const log = (req, res, next) => {
  console.log('logging')
  // Next is the next middleware you want to be invoked
  // It's a good practice to include next and not provide arguments
  next()
}

// ********** MIDDLEWARE - end ********** //

// ********** CONTROLERS - start ********** //

router.get('/me', (req, res) => {
  res.send({ me: 'helllo from router' })
})

// Now we need to mount this router
app.use('/api', router)

// Inserting the log middleware here runs the log middleware for only this route
app.get('/data', log, (req, res) => {
  res.send({ message: 'hello' })
})

app.post('/data', (req, res) => {
  res.send(req.body)
})

// ********** CONTROLERS - end ********** //

export const start = () => {
  app.listen(3000, () => {
    console.log('Server is listening on port 3000')
  })
}
