import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Model } from 'mongoose';

import { CandidatesService } from '@/candidates/candidates.service';
import { PublicUser, User, UserType } from '@/users/schemas/user.schema';
import { UsersService } from '@/users/users.service';
import { SignInResponseDto } from './dtos/sign-in.dto';

export enum AuthError {
  INVALID_CREDENTIALS,
  USER_REGISTRATION_FAILED,
  EMAIL_NOT_VERIFIED,
  EMAIL_VERIFICATION_TOKEN_INVALID_OR_EXPIRED,
}

@Injectable()
export class AuthService {
  public constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
    private userService: UsersService,
    private candidateService: CandidatesService,
  ) { }

  public async validateUser(email: string, password: string): Promise<PublicUser> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException(
        AuthError[AuthError.INVALID_CREDENTIALS]
      );
    }

    if (!user.emailVerified) {
      throw new UnauthorizedException(
        AuthError[AuthError.EMAIL_NOT_VERIFIED]
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (isPasswordValid) {
      const { passwordHash, ...result } = user.toObject();
      return result;
    }

    throw new UnauthorizedException(
      AuthError[AuthError.INVALID_CREDENTIALS]
    );
  }

  public async signIn(publicUser: PublicUser): Promise<SignInResponseDto> {
    const email = publicUser.email;
    const user = await this.userService.findByEmail(email);
    const accessToken = this.jwtService.sign({ email });

    let candidateOnboardingState: string | undefined = undefined;
    if (user.type === UserType.Candidate)
      candidateOnboardingState = await this.candidateService.updateOnboardingState(email);

    return {
      user: {
        email,
        type: user.type,
        candidateOnboardingState,
      },
      accessToken
    };
  }

  public async signUp(email: string, password: string, type: UserType) {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException(
        AuthError[AuthError.USER_REGISTRATION_FAILED]
      )
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const emailVerificationToken = randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date(
      Date.now() + 1000 * 60 * 60 * 24,
    );

    const user = await this.userModel.create({
      email,
      passwordHash,
      type,
      emailVerified: false,
      emailVerificationToken,
      emailVerificationExpires,
    });

    if (!user) {
      throw new BadRequestException(
        AuthError[AuthError.USER_REGISTRATION_FAILED]
      );
    }
  }

  public async verifyEmail(token: string) {
    const user = await this.userModel.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: {
        $gt: new Date(),
      },
    });

    if (!user) {
      throw new BadRequestException(
        AuthError[AuthError.EMAIL_VERIFICATION_TOKEN_INVALID_OR_EXPIRED],
      );
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();
  }

  public async resetPassword(email: string) {
    throw new BadRequestException("NOT_IMPLEMENTED");
  }
}
