import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { AuthService } from '../../shared/services/auth.service';

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
