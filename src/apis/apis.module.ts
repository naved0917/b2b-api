import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BrandApprovalModule } from './user/brand-approval/brand-approval.module';
import { CategoryModule } from './user/category/category.module';
import { CertificateCenterModule } from './user/certificate-center/certificate-center.module';
import { CompanyDetailModule } from './user/company-detail/company-detail.module';
import { CompanyProfileModule } from './user/company-profile/company-profile.module';
import { ExportCapabilityModule } from './user/export-capability/export-capability.module';
import { HelpComplainModule } from './user/help-complain/help-complain.module';
import { HelpDisputeModule } from './user/help-dispute/help-dispute.module';
import { HelpSuggestionModule } from './user/help-suggestion/help-suggestion.module';
import { ProductModule } from './user/product/product.module';
import { QualityControlModule } from './user/quality-control/quality-control.module';
import { RequestForQuotationModule } from './user/request-for-quotation/request-for-quotation.module';
import { ResearchAndDevelopmentModule } from './user/research-and-development/research-and-development.module';
import { SellerSearchModule } from './user/seller-search/seller-search.module';
import { SellerTypeModule } from './user/seller-type/seller-type.module';
import { BlogModule } from './user/blog/blog.module';
import { TradeshowModule } from './user/tradeshow/tradeshow.module';
import { UserVerificationModule } from './user/user-verification/user-verification.module';
import { ProductSearchModule } from './product-search/product-search.module';
import { MasterModule } from './master/master.module';
import { BuyerProfileModule } from './user/buyer-profile/buyer-profile.module';
import { BuyerMailsModule } from './user/buyer-mails/buyer-mails.module';
import { AssociateProfileModule } from './user/associate-profile/associate-profile.module';
import { SellerAdminModule } from './user/seller-admin/seller-admin.module';
import { AdminAssociateModule } from './user/admin-associate/admin-associate.module';
import { AgentProfileModule } from './user/agent-profile/agent-profile.module';
import { SellerAdminAgentModule } from './user/seller-admin-agent/seller-admin-agent.module';
import { AdminAgentModule } from './user/admin-agent/admin-agent.module';
import { DashboardModule } from './user/dashboard/dashboard.module';
import { SellerProfileModule } from './user/seller-profile/seller-profile.module';
import { ProfileModule } from './user/profile/profile.module';
import { InspectionModule } from './user/inspection/inspection.module';
import { BuyingInterestModule } from './user/buying-interest/buying-interest.module';
import { NoticebarModule } from './user/noticebar/noticebar.module';
import { FaqModule } from './user/faq/faq.module';

const modules = [
  BuyerMailsModule,
  AuthModule,
  ProductSearchModule,
  UserVerificationModule,
  BrandApprovalModule,
  CategoryModule,
  CertificateCenterModule,
  CompanyDetailModule,
  CompanyProfileModule,
  ExportCapabilityModule,
  HelpComplainModule,
  HelpDisputeModule,
  HelpSuggestionModule,
  ProductModule,
  QualityControlModule,
  ResearchAndDevelopmentModule,
  SellerTypeModule,
  RequestForQuotationModule,
  SellerSearchModule,
  BlogModule,
  TradeshowModule,
  MasterModule,
  BuyerProfileModule,
  SellerProfileModule,
  AssociateProfileModule,
  SellerAdminModule,
  AdminAssociateModule,
  AgentProfileModule,
  SellerAdminAgentModule,
  AdminAgentModule,
  DashboardModule,
  ProfileModule,
  InspectionModule,
  BuyingInterestModule,
  NoticebarModule,
  FaqModule
];

@Module({
  imports: modules,
  exports: modules,
})
export class ApisModule { }
