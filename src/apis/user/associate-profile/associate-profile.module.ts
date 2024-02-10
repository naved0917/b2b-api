import { Module } from '@nestjs/common';
import { AssociateProfileService } from './associate-profile.service';
import { AssociateProfileController } from './associate-profile.controller';
import { Associate, AssociateSchema } from './associate-profile.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from 'src/mail/mail.module';
import { AuthModule } from 'src/apis/auth/auth.module';
import { Auth, AuthSchema } from 'src/apis/auth/auth.schema';

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([{ name: 'Associate', schema: AssociateSchema }]),
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
  ],
  providers: [AssociateProfileService],
  controllers: [AssociateProfileController],
})
export class AssociateProfileModule {}
