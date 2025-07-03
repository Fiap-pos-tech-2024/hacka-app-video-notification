import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notification API',
      version: '1.0.0',
    },
  },
  // Em produção, apontar para código compilado em dist
  apis: ['./dist/adapter/driver/http/routes/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);