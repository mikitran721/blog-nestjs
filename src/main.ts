import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import cho static file
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  // config cho static file
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // config su dung swagger
  const config = new DocumentBuilder()
    .setTitle('Blog APIs')
    .setDescription('List APIs for simple Blog by Miki-Tran')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Users')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // duong dan api swagger
  SwaggerModule.setup('api', app, document);
  // bat `enableCors` de react call api
  app.enableCors();

  //config static.asset
  app.useStaticAssets(join(__dirname,'../../uploads'))

  await app.listen(5000);
}
bootstrap();
