import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(5000);
}
bootstrap();
