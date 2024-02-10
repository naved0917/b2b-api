import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
export interface User {
  _id: string;
  email: string;
}

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }

  async signUpVerification(
    _id: string,
    token: string,
    email: string,
    origin: string,
  ) {
    const url =
      ' https://bizzexpo.learnnowacademy.com' +
      `/user-auth/sign-up-verify?id=${_id}&token=${token}`;
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to B2B! Confirm your Email',
        html: `<p>Hi Welcome to B2B,</p>
                <p>Please click below to confirm your email</p>
                <p>
                    <a href="${url}"><span style="color: blue;">Confirm</span></a>
                </p>
                
                <p>If you did not request this email you can safely ignore it.</p>`,
      });
    } catch (error) {
      console.log(error);
    }
    return;
  }

  async forgotPasswordVerification(
    _id: string,
    token: string,
    email: string,
  ) {
    const url =
      ' https://bizzexpo.learnnowacademy.com' +
      `/user-auth/reset-password?id=${_id}&token=${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Forgot Password for B2B Account',
      html: `<p>Hey</p>
            <p>Please click below to reset your password</p>
            <p>
                <a href="${url}">Reset Password</a>
            </p>
            
            <p>If you did not request this email you can safely ignore it.</p>`,
    });
  }

  async associateVerification(_id: string, email: string, password: string) {
    const url =
      ' https://bizzexpo.learnnowacademy.com' + `/b2b/verify-Associate?id=${_id}`;
    // const url = 'http://localhost:4200' + `/b2b/verify-Associate?id=${_id}`;
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to B2B! Confirm your Email',
        html: `<p>Hi Welcome to B2B,</p>
                <p>
                    Your Username: ${email}, password: ${password}.
                </p>
                <p>Please click below to confirm your email</p>
                <p>
                    <a href="${url}"><span style="color: blue;">Confirm</span></a>
                </p>
                
                <p>If you did not request this email you can safely ignore it.</p>`,
      });
    } catch (error) {
      console.log(error);
    }
    return;
  }

  async AgentVerification(_id: string, email: string, password: string) {
    const url = ' https://bizzexpo.learnnowacademy.com' + `/b2b/verify-agent?id=${_id}`;
    // const url = 'http://localhost:4200' + `/b2b/verify-agent?id=${_id}`;
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to B2B! Confirm your Email',
        html: `<p>Hi Welcome to B2B,</p>
                <p>
                    Your Username: ${email}, password: ${password}.
                </p>
                <p>Please click below to confirm your email</p>
                <p>
                    <a href="${url}"><span style="color: blue;">Confirm</span></a>
                </p>
                
                <p>If you did not request this email you can safely ignore it.</p>`,
      });
    } catch (error) {
      console.log(error);
    }
    return;
  }


  async catelogVerification(payload) {
    let _id = payload._id;
    let email = payload.email;
    let sellerId = payload.sellerId;
    const url = " https://bizzexpo.learnnowacademy.com" + `/b2b/confirm-cataloging?id=${_id}` + `/sellerId=${sellerId}`;
    //  const url = 'http://localhost:4200' + `/b2b/confirm-cataloging?id=${_id}` + `/sellerId=${sellerId}`;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to B2B! Confirm your Catalog',
        html: `<p>Hi Welcome to B2B,</p>
                
                <p>Please click below to confirm your email</p>
                <p>
                    <a href="${url}"><span style="color: blue;">Confirm</span></a>
                </p>
                
                <p>If you did not request this email you can safely ignore it.</p>`,
      });
    } catch (error) {
      console.log(error);
    }
    return;
  }
}
