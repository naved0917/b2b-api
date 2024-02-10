import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { JwtStrategy } from 'src/apis/auth/jwt.strategy';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/role.guard';
import { UserVerificationService } from './user-verification.service';

@Controller('user-verification')
export class UserVerificationController {

    constructor(private userVerificationService: UserVerificationService){}

    @Get('buyer')
    @UseGuards(JwtStrategy)
    @Roles(Role.Admin)
    async getBuyerProfile(
        @Query('userId') userId
    ){
        return this.userVerificationService.getBuyerProfileById({userId})
    }

    @Get()
    @UseGuards(JwtStrategy)
    @Roles(Role.Admin)
    async getUsers(
        @Request() req: any,
        @Query('country') country: string,
        @Query('state') state: string,
        @Query('status') status: string,
        @Query('city') city: string,
        @Query('page') page: string,
        @Query('pageSize') pageSize: string
    ){
        return this.userVerificationService.getSellerAndBuyers({
            country, state, city, status, page, pageSize
        })
    }

    @Post('statusUpdate')
    @UseGuards(JwtStrategy)
    @Roles(Role.Admin)
    async approveOrReject(
        @Request() req: any,
        @Body('userId') userId: string,
        @Body('status') status: string,
    ){
        return this.userVerificationService.approveReject(userId, status)
    }

}
