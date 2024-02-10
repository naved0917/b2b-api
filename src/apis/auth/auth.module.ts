import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from 'src/mail/mail.module';
import { AuthController } from './auth.controller';
import { AuthSchema } from './auth.schema';
import { AuthService } from './auth.service';
import { JwtStrategy, SECRET } from './jwt.strategy';
import { SellerProfileModule } from '../user/seller-profile/seller-profile.module';
import { BuyerProfileModule } from '../user/buyer-profile/buyer-profile.module';

@Module({
  imports: [
    MailModule,
    SellerProfileModule,
    BuyerProfileModule,
    JwtModule.register({
      secret: SECRET,
      signOptions: { expiresIn: '99h' },
    }),
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
