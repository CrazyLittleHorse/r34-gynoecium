import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  const PORT = process.env.PORT || 3000;
  console.log(`r34bff start on port: ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
