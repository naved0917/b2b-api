import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { AgentProfileService } from './agent-profile.service';

@Controller('agent-profile')
export class AgentProfileController {
  constructor(private agentProfielService: AgentProfileService) {}

  @Post('/add')
  @Roles(Role.Admin)
  async addAgent(@Body() payload: any) {
    return await this.agentProfielService.addAgent(payload);
  }

  @Get('/:_id')
  async getAgentById(@Param('_id') _id: string) {
    return await this.agentProfielService.getAgentById(_id);
  }

  @Post('/get')
  async getAgentList(@Body() payload: any) {
    return await this.agentProfielService.getAgentList(payload);
  }

  @Post('/approved')
  async getAgentApproved(@Body() payload: any) {
    return await this.agentProfielService.getAgentApproved(payload);
  }

  @Put('/update')
  async updateAgent(@Body() payload:any) {
    return await this.agentProfielService.updateAgent(payload);
  }

  @Delete('/delete/:_id')
  @Roles(Role.Admin)
  async deleteAgent(@Param('_id') _id: string) {
    return await this.agentProfielService.deleteAgent(_id);
  }
}
