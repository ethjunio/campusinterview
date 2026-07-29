import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('Campus Interview')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  document.security = [{ bearer: [] }];

  for (const path in ['/api/signin', '/api/login']) {
    for (const method in document.paths[path]) {
      if (document.paths[path][method].security) {
        document.paths[path][method].security = [];
      }
    }
  }

  SwaggerModule.setup('api', app, document);
}
