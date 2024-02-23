import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { MailService } from "src/mail/mail.service";
import * as yup from "yup";
import { BuyerProfileService } from "../user/buyer-profile/buyer-profile.service";
import { SellerProfileService } from "../user/seller-profile/seller-profile.service";
import { Auth, LooseObject, TypeAuth } from "./auth.schema";

const passwordValidationSchema = yup
  .string()
  .required()
  .min(8, "Password must be 8 character")
  .max(24, "Password must be lower than 24 character")
  .matches(/[A-Z]/, "Must contain one uppercase")
  .matches(/([a-z])/, "Must contain one lowercase")
  .matches(/(\d)/, "Must contain one number")
  .matches(/(\W)/, "Must contain one special character");

@Injectable()
export class AuthService {
  constructor(
    @InjectModel("Auth")
    private readonly model: Model<Auth>,
    private jwtService: JwtService,
    private mailService: MailService,
    private sellerProfileService: SellerProfileService,
    private buyerProfileService: BuyerProfileService

  ) { }

  saltOrRounds = 10;

  async changePassword({ password, cpassword, oldPassword, _id }) {
    if (password === cpassword) {
      const findUser = await this.model.findById(_id);
      if (findUser) {
        const passwordValid = await bcrypt.compare(
          oldPassword,
          findUser?.password
        );
        if (passwordValid) {
          try {
            await passwordValidationSchema.validate(password);
            const hashedPassword = await bcrypt.hash(
              password,
              this.saltOrRounds
            );

            await this.model.findOneAndUpdate(
              { _id: findUser._id },
              { $set: { password: hashedPassword, cpassword } }
            );
            return {
              code: 200,
              status: "success",
              message: "Password Changed Successfully",
              data: -1,
            };
          } catch (error) {
            return {
              code: 400,
              status: "error",
              message: "Old Password is not valid",
              data: -1,
            };
          }
        } else
          return {
            code: 400,
            status: "error",
            message: "Old Password is not valid",
            data: -1,
          };
      } else
        return {
          code: 400,
          status: "error",
          message: "User Not Found",
          data: -1,
        };
    } else
      return {
        code: 400,
        status: "error",
        message: "Password and Confirm Password Does not matches.",
        data: -1,
      };
  }

  async signIn(email: string, phone: string, password: string, origin: string) {
    const findParams: LooseObject = {};
    if (email) {
      findParams.email = email;
    } else if (phone) {
      findParams.phone = phone;
    } else {
      return {
        header: {
          code: 400,
          status: "error",
          message: "Invalid Credentials",
        },
        data: -1,
      };
    }

    const queryResult = await this.model.findOne(findParams).exec();
    if (!queryResult) {
      return {
        header: {
          code: 400,
          status: "error",
          message: "User Not Found",
        },
        data: -1,
      };
    } else {
      const passwordValid = await bcrypt.compare(
        password,
        queryResult?.password
      );
      if (passwordValid && queryResult.isVerified === false) {
        await this.mailService.signUpVerification(
          queryResult._id,
          queryResult.secretToken,
          queryResult.email,
          origin
        );
        return {
          header: {
            code: 400,
            status: "error",
            message: "Verify The Email",
          },
          data: -1,
        };
      } else if (passwordValid) {
        const payload = {
          _id: queryResult._id,
          fName: queryResult.fName,
          lName: queryResult.lName,
          email: queryResult.email,
          phone: queryResult.phone,
          state:queryResult.state,
          role: queryResult.role,
          userId: queryResult.userId,
          company: queryResult.company,
          country: queryResult.country,
          city: queryResult.city,
          password: queryResult.password,
          isVerified: queryResult.isVerified,
          isApprovedByAdmin: queryResult.isApprovedByAdmin,
        };
        return {
          header: {
            code: 200,
            status: "success",
            message: "User Sign In Successfully",
          },
          data: {
            jwt: this.jwtService.sign(payload),
            ...payload,
          },
        };
      } else {
        return {
          header: {
            code: 400,
            status: "error",
            message: "Invalid Password",
          },
          data: -1,
        };
      }
    }
  }

  async signUp(params: TypeAuth, origin) {
    const checkEmail = await this.model.findOne({ email: params.email }).exec();
    const checkPhone = await this.model.findOne({ phone: params.phone }).exec();
    if (checkEmail && Object.keys(checkEmail)?.length > 0) {
      return {
        code: 400,
        status: "success",
        message: "Email already exist.",
        data: checkEmail
      };
    } else if (checkPhone && Object.keys(checkPhone)?.length > 0) {
      return {
        code: 400,
        status: "success",
        message: "Phone No already exist.",
        data: checkPhone
      };
    } else if ((checkEmail && Object.keys(checkEmail)?.length > 0) && (checkPhone && Object.keys(checkPhone)?.length > 0)) {
      return {
        code: 400,
        status: "success",
        message: "Email and Phone No already exist.",
        data: checkPhone
      };
    } else {
      if (params.role === 'seller') {
        params.isVerify = false,
          params.isPreview = false,
          params.assignAssociate = false,
          params.cataloging = 'Pending'
      }
      const auth = new this.model(params);
      const queryResult = await auth.save();
      if (params.role === 'seller') {
        params.userId = queryResult._id
        this.sellerProfileService.addSellerProfile(params);
      } else if (params.role === 'buyer') {
        params.userId = queryResult._id
        this.buyerProfileService.addBuyerProfile(params);
      }
      await this.mailService.signUpVerification(
        queryResult._id as string,
        params.secretToken,
        params.email,
        origin
      );
      return {
        code: 200,
        status: "success",
        message: "User Sign Up Successfully",
        data: queryResult._id as string,
      };
    }
  }

  async signUpVerify(_id: string, secretToken: string) {
    const updateResult = await this.model.updateOne(
      {
        _id: _id,
        isVerified: false,
        secretToken: secretToken,
      },
      {
        _id: _id,
        isVerified: true,
      }
    );

    if (updateResult) {
      const queryResult = await this.model
        .findOne({
          _id: _id,
          isVerified: true,
          secretToken: secretToken,
        })
        .exec();

      if (!queryResult) {
        return {
          header: {
            code: 400,
            status: "error",
            message: `Email and Phone Number already exist.`,
          },
          data: -1,
        };
      } else {
        const payload = {
          _id: queryResult._id,
          fName: queryResult.fName,
          lName: queryResult.lName,
          email: queryResult.email,
          phone: queryResult.phone,
          role: queryResult.role,
        };

        return {
          header: {
            code: 200,
            status: "success",
            message: `Account Verified Successfully`,
          },
          data: {
            jwt: this.jwtService.sign(payload),
            ...payload,
          },
        };
      }
    } else {
      return {
        header: {
          code: 400,
          status: "error",
          message: `Email and Phone Number not verified.`,
        },
        data: -1,
      };
    }
  }

  async forgotPassword(email: string) {
    const queryResult = await this.model.findOne({ email }).exec();
    if (!queryResult) {
      return {
        header: {
          code: 400,
          status: "error",
          message: "User Not Found",
        },
        data: -1,
      };
    } else {
      await this.model.updateOne({ email }, { isPasswordReset: false });
      await this.mailService.forgotPasswordVerification(
        queryResult._id,
        queryResult.resetToken,
        queryResult.email,
      );
      return {
        header: {
          code: 200,
          status: "success",
          message: "Reset Password",
        },
        data: {
          _id: queryResult._id,
          email: queryResult.email,
        },
      };
    }
  }

  async resetPassword(
    _id: string,
    resetToken: string,
    newPassword: string,
    cpassword: string
  ) {
    const updateResult = await this.model.updateOne(
      {
        isPasswordReset: false,
        resetToken: resetToken,
      },
      {
        _id: _id,
        password: newPassword,
        cpassword: cpassword,
        resetToken: Math.floor(1000 + Math.random() * 9000).toString(),
        isPasswordReset: true,
      }
    );

    if (!updateResult) {
      return {
        header: {
          code: 400,
          status: "error",
          message: `Something Went Wrong`,
        },
        data: -1,
      };
    } else {
      return {
        header: {
          code: 200,
          status: "success",
          message: `Reset Successfully`,
        },
        data: -1,
      };
    }
  }

  mapSellers(result) {
    return result.map(
      ({ _id, company, fName, lName, city, country, address1 }) => {
        return {
          _id,
          fName,
          lName,
          city,
          country,
          company,
          address1,
        };
      }
    );
  }

  async sellerSearch(search: string) {
    search = search.toLowerCase();
    const result = await this.model.find({ role: "seller" });
    const filter = result.filter((i) => {
      if (i.fName.toLowerCase().includes(search)) return true;
      if (i.company.toLowerCase().includes(search)) return true;
    });
    const mappedValues = this.mapSellers(filter);
    return {
      header: {
        code: 400,
        status: "error",
        message: `Something Went Wrong`,
      },
      data: mappedValues,
    };
  }

  async sellerLogedIn(sellerId: string) {
    const result = await this.model.findOne({ _id: sellerId });
    const payload = {
      _id: result._id,
      fName: result.fName,
      lName: result.lName,
      email: result.email,
      phone: result.phone,
      role: result.role,
      userId: result.userId,
      company: result.company,
      country: result.country,
      city: result.city,
      password: result.password,
      isVerified: result.isVerified,
      isApprovedByAdmin: result.isApprovedByAdmin,
    };
    return {
      header: {
        code: 200,
        status: "success",
        message: `Seller details fetch successfully`,
      },
      data: { jwt: this.jwtService.sign(payload), ...payload },
    };
  }
}
