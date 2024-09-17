import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from 'interceptors/response.interceptor';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserInterceptor } from 'interceptors/user.interceptor';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Cấu hình CORS
    app.enableCors({
      origin: 'http://localhost:3000', //  địa chỉ frontend 
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
    });
  const config = new DocumentBuilder()
    .setTitle("List API")
    .setDescription("List API for management restaurant by BTNgan")
    .setVersion("1.0")
    .addTag("Auth")
    .addTag("Users")
    .addTag("MenuItem")
    .addTag("Menu")
    .addTag("Reservation")
    .addTag("WarehouseSlip")
    .addTag("Suppliers")
    .addTag("Ingredient")
    .addTag("Vouchers")
    .addTag("Feedbacks")
    .addTag("Orders")
    .addTag("Table")
    .addTag("Roles")
    .addTag("Permissions")
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()));
  app.useGlobalInterceptors(new UserInterceptor());

  //consfig version
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1','2']
  });

  await app.listen(process.env.PORT);
}
bootstrap();
