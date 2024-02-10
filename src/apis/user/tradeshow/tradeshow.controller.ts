import {
    Controller,
    Body,
    Param,
    Post,
    Get,
    Put,
    Delete,
    Req,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { TradeshowService } from './tradeshow.service';

@Controller('tradeShow')
export class TradeShowController {
    constructor(private readonly tradeshowService: TradeshowService) { }

    @Post('/add')
    @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
    async addTradeshow(
        @Req() request: any,
        @Body('eventName') eventName: string,
        @Body('eventType') eventType: string,
        @Body('category') category: string[],
        @Body('item') item: string,
        @Body('phone') phone: string,
        @Body('venue') venue: string,
        @Body('country') country: string,
        @Body('state') state: string,
        @Body('city') city: string,
        @Body('fromDate') fromDate: string,
        @Body('toDate') toDate: string,
        @Body('string') string: string,
        @Body('file') file: string,
        @Body('description') description: string



    ) {
        return await this.tradeshowService.addTradeShow({
            userId: request.userId,
            eventName: eventName,
            eventType: eventType,
            category: category,
            item: item,
            phone: phone,
            venue: venue,
            country: country,
            state: state,
            city: city,
            fromDate: fromDate,
            toDate: toDate,
            file: file,
            description: description,
            timestamp: new Date(),
        });
    }

    @Get('/get/:_id')
    async getTradeShow(@Param('_id') _id: string) {
        return await this.tradeshowService.getTradeShow(_id);
    }

    @Get('/get-list')
    async getTradeshowList() {
        return await this.tradeshowService.getTradeShowList();
    }

    @Put('/update')
    @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
    async updateTradeShow(
        @Body('_id') _id: string,
        @Body('eventName') eventName: string,
        @Body('eventType') eventType: string,
        @Body('category') category: string[],
        @Body('item') item: string,
        @Body('phone') phone: string,
        @Body('venue') venue: string,
        @Body('country') country: string,
        @Body('state') state: string,
        @Body('city') city: string,
        @Body('fromDate') fromDate: string,
        @Body('toDate') toDate: string,
        @Body('string') string: string,
        @Body('file') file: string,
        @Body('description') description: string

    ) {
        return await this.tradeshowService.updateTradeShow(_id, {
            eventName: eventName,
            eventType: eventType,
            category: category,
            item: item,
            phone: phone,
            venue: venue,
            country: country,
            state: state,
            city: city,
            fromDate: fromDate,
            toDate: toDate,
            file: file,
            description: description,
            timestamp: new Date(),
        });
    }

    @Delete('/delete/:_id')
    @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
    async deleteTradeShow(@Param('_id') _id: string) {
        return await this.tradeshowService.deleteTradeShow(_id);
    }
}
