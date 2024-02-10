import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExportCapabilityController } from './export-capability.controller';
import { ExportCapabilitySchema } from './export-capability.schema';
import { ExportCapabilityService } from './export-capability.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ExportCapability', schema: ExportCapabilitySchema },
    ]),
  ],
  providers: [ExportCapabilityService],
  controllers: [ExportCapabilityController],
})
export class ExportCapabilityModule { }
