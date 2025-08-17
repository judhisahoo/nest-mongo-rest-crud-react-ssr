import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Tell class-validator to use NestJS dependency injection container
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Rest API with Nest JS')
    .setDescription('The Product CRUD API with user authentication')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Product Manage')
    .addTag('Contacts Manage')
    .addTag('All Users')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWD',
        name: 'JWD',
        description: 'Enter JWT Token',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
