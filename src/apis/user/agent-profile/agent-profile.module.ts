import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from 'src/apis/auth/auth.schema';
import { MailModule } from 'src/mail/mail.module';
import { AgentProfileController } from './agent-profile.controller';
import { AgentSchema } from './agent-profile.schema';
import { AgentProfileService } from './agent-profile.service';

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([{ name: 'Agent', schema: AgentSchema }]),
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
  ],
  providers: [AgentProfileService],
  controllers: [AgentProfileController],
})
export class AgentProfileModule {}
