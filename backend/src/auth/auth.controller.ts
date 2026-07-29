import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInRequestDto, SignInResponseDto } from './dtos/sign-in.dto';
import { SignUpRequestDto } from './dtos/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  public constructor(private authService: AuthService) { }

  @ApiOkResponse({ type: SignInResponseDto })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post(['signin', 'login'])
  public async signIn(@Request() req: any, @Body() _body: SignInRequestDto) {
    const data = await this.authService.signIn(req.user);
    return { data };
  }

  @Public()
  @Post(['signup', 'register'])
  public async signUp(@Body() body: SignUpRequestDto) {
    await this.authService.signUp(body.email, body.password, body.type);
  }

  @Get('profile')
  public getProfile(@Request() req: any) {
    return req.user;
  }
}
