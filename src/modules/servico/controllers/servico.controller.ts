import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundResultDto, ResultDto } from '../../common/dtos/result.dto';
import { CreateServicoDto } from '../dtos/create-servico.dto';
import { ServicoEntity } from '../entities/servico.entity';
import { ServicoService } from '../services/servico.service';

@ApiTags('Serviços')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('servicos')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @ApiOkResponse({ type: [ServicoEntity] })
  @Get()
  async find() {
    return await this.servicoService.find();
  }

  @ApiOkResponse({ type: ServicoEntity })
  @ApiNotFoundResponse({ type: NotFoundResultDto })
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    const servico = await this.servicoService.findById(id);

    if (!servico) throw new NotFoundException('Serviço não encontrado.');

    return servico;
  }

  @Post()
  async create(@Body() dto: CreateServicoDto) {
    const servico = await this.servicoService.create(dto).catch(err => {
      throw new HttpException(
        new ResultDto({
          sucesso: false,
          mensagem: 'Erro ao criar serviço.',
          erro: err.message,
        }),
        err instanceof HttpException ? err.getStatus() : HttpStatus.BAD_REQUEST,
      );
    });

    return new ResultDto({
      sucesso: true,
      mensagem: 'Serviço criado com sucesso.',
      dados: servico,
    });
  }
}
