import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import { writeFileSync } from 'fs';
import { dump } from 'js-yaml';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('seisan-app API docs')
    .setDescription('seisan-appのAPI仕様書です。')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  const outputPath = path.resolve(
    `${process.cwd()}/test/dredd/`,
    'openapi.yml',
  );
  writeFileSync(outputPath, dump(document, {}));

  await app.listen(3000);
}
bootstrap();
