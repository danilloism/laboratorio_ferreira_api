import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { ResultDto } from '../common/dtos/result.dto';
import { PrismaHealthIndicator } from '../data/services/prisma.health-indicator';

@IsPublic()
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly db: PrismaHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async healthCheck(): Promise<ResultDto> {
    const result = await this.health.check([
      () => this.db.pingCheck('database'),
      //TODO: aplicar os outros health indicators
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
