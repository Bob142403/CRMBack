import cors from 'cors'
import users from './src/users/users.route.ts'
import clients from './src/clients/clients.route.ts'
import auths from './src/auth/auth.route.ts'
import company from './src/company/company.route.ts'
import express from 'express'
import { serve, setup } from 'swagger-ui-express'

const PORT = process.env.PORT ?? 3000
const app = express()

const swaggerDocument = {
  swagger: '2.0',
  info: {
    title: 'Blah',
    description: '',
    version: '1.0',
  },
  produces: ['application/json'],
  paths: {
    '/test': {
      post: {
        'x-swagger-router-controller': 'home',
        operationId: 'index',
        tags: ['/test'],
        description: '[Login 123](https://www.google.com)',
        parameters: [
          {
            name: 'test',
            in: 'formData',
            type: 'array',
            collectionFormat: 'multi',
            items: {
              type: 'integer',
            },
          },
          { name: 'profileId', in: 'formData', required: true, type: 'string' },
          { name: 'file', in: 'formData', type: 'file', required: 'true' },
        ],
        responses: {},
      },
    },
    '/bar': {
      get: {
        'x-swagger-router-controller': 'bar',
        operationId: 'impossible',
        tags: ['/test'],
        description: '',
        parameters: [],
        responses: {},
      },
    },
  },
}

app.use('/api-docs', serve, setup(swaggerDocument))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/users', users)
app.use('/clients', clients)
app.use('/company', company)
app.use(auths)

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}....`)
})
