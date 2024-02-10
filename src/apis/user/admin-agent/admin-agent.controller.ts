import {
  Body, Controller, Post
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AdminAgentService } from './admin-agent.service';

@Controller('admin-Agent')
export class AdminAgentController {
  constructor(private adminAgentService: AdminAgentService) { }

  @Post('/assign-Agent')
  @Roles(Role.Admin)
  async assignAgent(@Body() payload: any) {
    return await this.adminAgentService.assignAgent(payload);
  }

  @Post('/get-assign-Agent')
  async AssignAgentList(@Body() payload: any) {
    return await this.adminAgentService.AssignAgentList(payload);
  }

  @Post('/send-mail')
  async sendMailSeller(@Body() payload: any) {
    return await this.adminAgentService.sendMailSeller(payload);
  }

  @Post('/verify')
  async sellerVerify(@Body() payload: any) {
    return await this.adminAgentService.sellerVerify(payload);
  }
}

