import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ApisModule } from './apis/apis.module';
import { RolesGuard } from './guards/role.guard';
import { MailModule } from './mail/mail.module';
import { AzureStorageModule } from '@nestjs/azure-storage';
import { ImageService } from './imageUploader/image.service';
import { ImageController } from './imageUploader/image.controller';
require('dotenv').config();

@Module({
  controllers:[ImageController],
  imports: [
    MongooseModule.forRoot(process.env.DB_URL,{ dbName: "b2b" }
    ), 
    ApisModule, 
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AzureStorageModule.withConfig({
      sasKey: process.env['AZURE_STORAGE_SAS_KEY'],
      accountName: process.env['AZURE_STORAGE_ACCOUNT'],
      containerName: 'b2b',
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    ImageService
  ]
})
export class AppModule { }
