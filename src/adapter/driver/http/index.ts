import 'dotenv/config';
import express from 'express';
import notificationRoutes from './routes/notification.route';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';
import { metricsMiddleware, register } from '../../../config/prometheus';

const app = express();

app.use(express.json());
app.use(metricsMiddleware); 

app.use('/api', notificationRoutes);
app.use('/notification-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/notification-metrics', async (_req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end((err as Error).message);
  }
});

const PORT = process.env.PORT || 3001;
const ALB_DNS = process.env.ALB_DNS || 'localhost';

app.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
  console.log(`Docs: http://${ALB_DNS}/notification-docs`);
  console.log(`Metrics: http://${ALB_DNS}/notification-metrics`);
});
