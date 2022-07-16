import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.enableCors({ origin: 'https://todothamer.000webhostapp.com/', credentials: true });

  // swagger
  const options = new DocumentBuilder()
    .setTitle('Nest JWT Authentication')
    .setDescription('Rest API with JWT token key for Authentication')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
