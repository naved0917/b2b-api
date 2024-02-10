import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();

const bootstrap = async () => {
  const bodyParser = await require('body-parser');
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({ credentials: true, origin: '*' });
  await app.listen(process.env.PORT || 4001);
}
bootstrap()
