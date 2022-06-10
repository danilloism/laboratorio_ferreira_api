import { Controller, Get } from '@nestjs/common';
import { ResultDto } from '../../common/dtos/result.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@IsPublic()
@Controller()
export class HealthController {
  @Get('health-check')
  healthCheck() {
    return new ResultDto({ sucesso: true });
  }
}
