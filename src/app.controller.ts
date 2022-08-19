import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { join } from 'path';
import { PrismaHealthIndicator } from 'src/modules/data/services/prisma.health-indicator';
import { IsPublic } from './modules/auth/decorators/is-public.decorator';
import { ResultDto } from './modules/common/dtos/result.dto';

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
  async healthCheck(): Promise<ResultDto> {
    const result = await this.health.check([
      () => this.db.pingCheck('database'),
      () => this.http.pingCheck('docs', join(process.env.HOST, 'docs')),
    ]);

    const status = result.status;

    if (status == 'error' || status == 'shutting_down') {
      throw new InternalServerErrorException(
        new ResultDto({
          sucesso: false,
          mensagem: 'Erro ao realizar health check.',
          erro: result.error,
          dados: result.info,
        }),
      );
    }

    result.error = undefined;
    return new ResultDto({
      sucesso: true,
      mensagem: 'Health check realizado com sucesso.',
      dados: result,
    });
  }
}
