import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from 'src/apis/auth/auth.schema';
import { MasterCategorySchema } from 'src/apis/master/master-category/master-category.schema';
import { CompanyProfileSchema } from '../company-profile/company-profile.schema';
import { RequestForQuotationController } from './request-for-quotation.controller';
import { RequestForQuotationSchema } from './request-for-quotation.schema';
import { RequestForQuotationService } from './request-for-quotation.service';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'RequestForQuotation', schema: RequestForQuotationSchema },
            { name: 'MasterCategory', schema: MasterCategorySchema },
            { name: 'Auth', schema: AuthSchema },
            { name: 'CompanyProfile', schema: CompanyProfileSchema },
        ]),
    ],
    providers: [RequestForQuotationService],
    controllers: [RequestForQuotationController],
})
export class RequestForQuotationModule { }
