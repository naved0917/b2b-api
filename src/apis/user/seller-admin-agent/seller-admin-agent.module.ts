import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerAdminAgentController } from './seller-admin-agent.controller';
import { SellerAdminAgentSchema } from './seller-admin-agent.schema';
import { SellerAdminAgentService } from './seller-admin-agent.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SellerAdminAgent', schema: SellerAdminAgentSchema }]),
  ],
  providers: [SellerAdminAgentService],
  controllers: [SellerAdminAgentController],
})
export class SellerAdminAgentModule { }
