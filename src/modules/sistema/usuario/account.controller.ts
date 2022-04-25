import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard, AuthService } from '../auth';

@Controller('accounts')
export class AccountController {
  constructor(private authService: AuthService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    console.log(req.user);
    return [];
  }

  @Post()
  async criarToken() {
    return await this.authService.criarToken();
  }
}
