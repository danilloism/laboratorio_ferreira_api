import { Controller, Get } from '@nestjs/common';
import { PrismaHealthIndicator } from 'src/modules/data/services/prisma.health-indicator';
import { ResultDto } from './modules/common/dtos/result.dto';
import { IsPublic } from './modules/auth/decorators/is-public.decorator';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@IsPublic()
@Controller()
export class AppController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: PrismaHealthIndicator,
  ) {}

  @Get('health')
  @HealthCheck()
  healthCheck() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () =>
        this.http.pingCheck('api-docs', `${ process.env.SERVER_URL }/api-docs`),
    ]);

    return new ResultDto({ sucesso: true });
  }
}
