import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [process.env.FRONTEND_ORIGIN || "http://localhost:3000"]
    }
  });

  const config = new DocumentBuilder()
    .setTitle('Ralmet test')
    .setDescription('Api doc')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => {
    console.log(`App started on ${PORT}`);
  });
}

start();
