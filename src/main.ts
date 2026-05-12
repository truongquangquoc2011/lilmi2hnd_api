import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { envConfig } from './shared/config'
import { ZodValidationPipe } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ZodValidationPipe());
  app.setGlobalPrefix('/api/', {
    exclude: ['/docs', '/docs-json'],
  })
  app.enableCors()

  await app.listen(envConfig.port ?? 3000)
}
bootstrap()
  