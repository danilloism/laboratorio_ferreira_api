import { Controller, Get } from '@nestjs/common';
import { ResultDto } from './modules/common/dtos/result.dto';
import { IsPublic } from './modules/auth/decorators/is-public.decorator';

@IsPublic()
@Controller()
export class AppController {
  @Get('health-check')
  healthCheck() {
    return new ResultDto({ sucesso: true });
  }
}
