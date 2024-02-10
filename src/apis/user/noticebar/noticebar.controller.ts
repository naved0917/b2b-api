import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post
} from '@nestjs/common';
import { NoticebarService } from './noticebar.service';

@Controller('noticebar')
export class NoticebarController {
    constructor(private readonly noticebarService: NoticebarService) { }

    @Post('/add')
    async addNoticebar(@Body() payload: any) {
        return await this.noticebarService.addNoticebar(payload);
    }

    @Get('/get/:_id')
    async getNoticebar(@Param('_id') _id: string) {
        return await this.noticebarService.getNoticebar(_id);
    }

    @Get('/get-list')
    async getNoticebarList() {
        return await this.noticebarService.getNoticebarList();
    }

    @Post('/update')
    async updateNoticebar(@Body() payload: any) {
        return await this.noticebarService.updateNoticebar(payload);
    }

    @Delete('/delete/:_id')
    async deleteNoticebar(@Param('_id') _id: string) {
        return await this.noticebarService.deleteNoticebar(_id);
    }
}
