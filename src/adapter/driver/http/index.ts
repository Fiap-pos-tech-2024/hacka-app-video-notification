import express from 'express';
import notificationRoutes from './routes/notification.route';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';

const app = express();
app.use(express.json());
app.use('/api', notificationRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log('Notification service running on port 3000');
}); 