import {
  Body,
  Controller,
  Req,
  Get,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import * as bcrypt from "bcrypt";
import * as yup from "yup";
import { JwtAuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { IsApprovedByAdmin } from "./auth.schema";

const passwordValidationSchema = yup
  .string()
  .required()
  .min(8, "Password must be 8 character")
  .max(24, "Password must be lower than 24 character")
  .matches(/[A-Z]/, "Must contain one uppercase")
  .matches(/([a-z])/, "Must contain one lowercase")
  .matches(/(\d)/, "Must contain one number")
  .matches(/(\W)/, "Must contain one special character");

@Controller("auth")
export class AuthController {
  saltOrRounds = 10;
  constructor(private readonly authService: AuthService) { }

  @Post("/sign-in")
  async signIn(
    @Body("email") email: string,
    @Body("phone") phone: string,
    @Body("password") password: string,
    @Body("origin") origin: string
  ) {
    return await this.authService.signIn(email, phone, password, origin);
  }

  @Post("/change-password")
  @UseGuards(JwtAuthGuard)
  @Roles(
    Role.Admin,
    Role.Agent,
    Role.Associate,
    Role.Buyer,
    Role.Seller,
    Role.BuyerSeller
  )
  async changePassword(
    @Body("oldPassword") oldPassword: string,
    @Body("password") password: string,
    @Body("cpassword") cpassword: string,
    @Req() request: any
  ) {
    return await this.authService.changePassword({
      oldPassword,
      password,
      cpassword,
      _id: request.user._id,
    });
  }

  @Post("/sign-up")
  async signUp(
    @Body("company") company: string,
    @Body("fName") fName: string,
    @Body("lName") lName: string,
    @Body("email") email: string,
    @Body("phone") phone: string,
    @Body("code") code: string,
    @Body("address1") address1: string,
    @Body("city") city: string,
    @Body("country") country: string,
    @Body("state") state: string,
    @Body("password") password: string,
    @Body("cpassword") cpassword: string,
    @Body("role") role: string,
    @Body("origin") origin: string
  ) {
    try {
      if (
        !(
          role === "buyer" ||
          role === "seller" ||
          role === "buyer-seller" ||
          role === "admin"
        )
      ) {
        return {
          header: {
            code: 401,
            status: "error",
            message: "Invalid role",
          },
          data: -1,
        };
      }

      await passwordValidationSchema.validate(password);
      const hashedPassword = await bcrypt.hash(password, this.saltOrRounds);
      return await this.authService.signUp(
        {
          userId: "self",
          company,
          fName,
          lName,
          email,
          phone,
          code,
          address1,
          city,
          country,
          state,
          password: hashedPassword,
          cpassword,
          role,
          resetToken: Math.floor(100000 + Math.random() * 9000).toString(),
          secretToken: Math.floor(100000 + Math.random() * 9000).toString(),
          isPasswordReset: false,
          isVerified: false,
          timestamp: new Date(),
          isPreview: false,
          isVerify: false,
          assignAssociate: false,
          cataloging: '',
          isApprovedByAdmin: IsApprovedByAdmin.Pending,
        },
        origin
      );
    } catch (error) {
      return {
        header: {
          code: 400,
          status: "error",
          message: error.message.replace("this", "Password "),
        },
        data: -1,
      };
    }
  }

  @Post("/sign-up-verify")
  async signUpVerify(
    @Body("_id") _id: string,
    @Body("secretToken") secretToken: string
  ) {
    return await this.authService.signUpVerify(_id, secretToken);
  }

  @Post("/forgot-password")
  async forgotPassword(
    @Body("email") email: string,
  ) {
    return await this.authService.forgotPassword(email);
  }

  @Post("/reset-password")
  async resetPassword(
    @Body("_id") _id: string,
    @Body("resetToken") resetToken: string,
    @Body("newPassword") newPassword: string
  ) {
    const cpassword = newPassword;
    const hashedNewPassword = await bcrypt.hash(newPassword, this.saltOrRounds);
    return await this.authService.resetPassword(
      _id,
      resetToken,
      hashedNewPassword,
      cpassword
    );
  }

  @Post("/associate-seller/login")
  async sellerLogedIn(@Body("sellerId") sellerId: string) {
    return await this.authService.sellerLogedIn(sellerId);
  }
}
