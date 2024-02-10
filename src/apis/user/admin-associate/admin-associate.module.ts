import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from 'src/apis/auth/auth.schema';
import { MailModule } from 'src/mail/mail.module';
import { AdminAssociateController } from './admin-associate.controller';
import { AdminAssociateSchema } from './admin-associate.schema';
import { AdminAssociateService } from './admin-associate.service';


@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([{ name: 'AdminAssociate', schema: AdminAssociateSchema }]),
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
  ],
  providers: [AdminAssociateService],
  controllers: [AdminAssociateController],
})
export class AdminAssociateModule {}
