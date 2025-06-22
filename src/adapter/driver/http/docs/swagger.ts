import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notification API',
      version: '1.0.0',
    },
  },
  apis: ['./src/adapter/driver/http/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options); 