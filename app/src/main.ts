import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as webPush from 'web-push';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Rabbit chat API')
    .setDescription('The user API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3201);
}

const VAPID_PUBLIC_KEY =
  'BOEhiGHpSfyAmoGU_Kg7H8EQqZ6TfkvyyG98S5nh-4omLebX5fsCDup9ORt4LZaVyYVJy8flLYYnTS-FOUSc92Q';
const VAPID_PRIVATE_KEY = 'TFNapGqJY2W7ZKboAwWwMJtLr3lVdPq4pE00opzXD3k';

webPush.setVapidDetails(
  'mailto:your-email@example.com', // あなたの連絡先
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY,
);
bootstrap();
