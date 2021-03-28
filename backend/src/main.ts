import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './adapters/redis.adapter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = parseInt(process.env.SERVER_PORT) || 3000;
  const logger = new Logger('Main');

  app.enableCors({ origin: true });
  app.useWebSocketAdapter(new RedisIoAdapter(app));

  await app.listen(PORT, () => {
    logger.debug(`Server started on port ${PORT}`);
  });
}
bootstrap();
