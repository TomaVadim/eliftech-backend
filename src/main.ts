import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS_CONFIG } from './configs/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(CORS_CONFIG);
  await app.listen(process.env.PORT);
}
bootstrap();
