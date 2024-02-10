import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CertificateCenterService } from './certificate-center.service';
import { CertificateCenterController } from './certificate-center.controller';
import { CertificateCenterSchema } from './certificate-center.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CertificateCenter', schema: CertificateCenterSchema },
    ]),
  ],
  providers: [CertificateCenterService],
  controllers: [CertificateCenterController],
})
export class CertificateCenterModule { }
