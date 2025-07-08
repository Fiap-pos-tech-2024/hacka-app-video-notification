import swaggerJSDoc from 'swagger-jsdoc';

const albDns = process.env.ALB_DNS || 'localhost';
const port = process.env.PORT || '3001';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notification API',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://${albDns}`,
        description: 'Production ALB',
      },
      {
        url: `http://localhost:${port}`,
        description: 'Local development',
      }
    ],
  },
  apis: ['./dist/adapter/driver/http/routes/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);
