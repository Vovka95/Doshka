import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.use(cookieParser());

    const origins = [
        configService.get<string>('FRONTEND_ORIGIN'),
        configService.get<string>('FRONTEND_ORIGIN_WWW'),
    ].filter((origin): origin is string => Boolean(origin));

    app.enableCors({ origin: origins, credentials: true });

    app.setGlobalPrefix('api');

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Doshka API')
        .setDescription(
            'API documentation for the Doshka project management tool',
        )
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);

    const port = configService.get<number>('PORT') || 4000;

    await app.listen(port);
}

void bootstrap();
