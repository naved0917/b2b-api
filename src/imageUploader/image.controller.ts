import {
    Controller,
    Get,
    Logger,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
    constructor(private imageService: ImageService) { }
    
    @Post('/normal')
    @UseInterceptors(FileInterceptor('file'))
    async UploadedNormalFilesUsingService(
        @UploadedFile() file: Express.Multer.File,
    ) {
        const storageUrl = await this.imageService.uploadNormalFile(file);
        return storageUrl
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async UploadedFilesUsingService(
        @UploadedFile() file: Express.Multer.File,
    ) {
        const storageUrl = await this.imageService.upload(file);
        return storageUrl
    }
}