import swaggerJSDoc from 'swagger-jsdoc'

const albDns = process.env.ALB_DNS || 'localhost'
const port = process.env.PORT || '3001'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notification API',
      version: '1.0.0',
      description: 'API para envio de notificações por e-mail'
    },
    servers: [
      {
        url: `http://${albDns}`,
        description: 'Production ALB'
      },
      {
        url: `http://localhost:${port}`,
        description: 'Local development'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./dist/adapter/driver/http/routes/*.js'] // gerado após build
}

export const swaggerSpec = swaggerJSDoc(options)
