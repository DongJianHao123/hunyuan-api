import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { config } from 'dotenv';
async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: true, // 允许所有来源访问
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true, // 允许带凭证访问
  };

  app.enableCors(corsOptions);

  await app.listen(process.env.PORT);
  console.log(`starting at http://localhost:${process.env.PORT}`);
}
bootstrap();
