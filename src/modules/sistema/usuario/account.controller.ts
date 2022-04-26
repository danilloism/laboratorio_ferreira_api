import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard, AuthService } from '../auth';

@ApiTags('Usuários')
@Controller('accounts')
export class AccountController {
  constructor(private authService: AuthService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    console.log(req.user);
    return [];
  }

  @Post()
  async criarToken() {
    return await this.authService.criarToken();
  }
}
