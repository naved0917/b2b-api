import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post
} from '@nestjs/common';
import { FaqService } from './faq.service';

@Controller('faq')
export class FaqController {
    constructor(private readonly faqService: FaqService) { }

    @Post('/add')
    async addFaq(@Body() payload: any) {
        return await this.faqService.addFaq(payload);
    }

    @Get('/get/:_id')
    async getFaq(@Param('_id') _id: string) {
        return await this.faqService.getFaq(_id);
    }

    @Get('/get-list')
    async getFaqList() {
        return await this.faqService.getFaqList();
    }

    @Post('/update')
    async updateFaq(@Body() payload: any) {
        return await this.faqService.updateFaq(payload);
    }

    @Delete('/delete/:_id')
    async deleteFaq(@Param('_id') _id: string) {
        return await this.faqService.deleteFaq(_id);
    }
}
