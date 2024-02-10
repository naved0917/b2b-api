import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from 'src/apis/auth/auth.schema';
import { MailModule } from 'src/mail/mail.module';
import { AdminAgentController } from './admin-agent.controller';
import { AdminAgentSchema } from './admin-agent.schema';
import { AdminAgentService } from './admin-agent.service';


@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([{ name: 'AdminAgent', schema: AdminAgentSchema }]),
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
  ],
  providers: [AdminAgentService],
  controllers: [AdminAgentController],
})
export class AdminAgentModule { }
