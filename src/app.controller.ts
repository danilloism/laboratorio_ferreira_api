import { Controller, Get } from '@nestjs/common';
import { IsPublic } from './modules/sistema/auth/decorators/is-public.decorator';

@Controller()
export class AppController {
  //   @IsPublic()
  //   @Get('api-docs')
  //   get() {}
}
