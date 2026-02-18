import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Contract: /v1/...
  app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Dev-only CORS + Swagger at /docs (without /v1)
  if (process.env.NODE_ENV !== 'production') {
    app.enableCors({ origin: true });

    const config = new DocumentBuilder()
      .setTitle('appsicologa API')
      .setDescription('MVP v0.1 API skeleton')
      .setVersion('0.1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, { useGlobalPrefix: false });
  }

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port, '0.0.0.0');

  // eslint-disable-next-line no-console
  console.log(`[OK] api listening on http://0.0.0.0:${port}/v1`);
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(`[OK] swagger on http://0.0.0.0:${port}/docs`);
  }
}

void bootstrap();
