import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger as honoLogger } from 'hono/logger';
import { useLoggerRequestContext, logger } from './logger.js';

const app = new Hono();

app.use(useLoggerRequestContext());
app.use(honoLogger(logger.info.bind(logger)));

app.get('/hello', async (c) => {
  logger.info('Computing...');
  await new Promise(r => setTimeout(r, 2000));
  logger.info('Done!');
  return c.text('Hello Hono!');
});

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  logger.info(`Server is running on http://localhost:${info.port}`);
});
