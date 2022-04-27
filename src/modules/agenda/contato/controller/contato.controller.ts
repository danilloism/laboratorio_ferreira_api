import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResultDto } from '../../../../shared/dtos/result.dto';
import { UpdateContatoDto } from '../dto/update-contato.dto';
import { CreateContatoDto } from '../dto/create-contato.dto';
import { ContatoService } from '../service/contato.service';

@ApiTags('Contatos')
@Controller('contatos')
export class ContatoController {
  constructor(private readonly service: ContatoService) {}
  @Get()
  async get() {
    return await this.service.find();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() model: CreateContatoDto): Promise<ResultDto> {
    const contato = await this.service.create(model).catch(err => {
      const result = new ResultDto({
        success: false,
        message: 'Falha ao criar contato.',
        errors: err,
      });

      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    });

    if (!contato) {
      throw new HttpException(
        new ResultDto({
          success: false,
          message: 'Falha desconhecida ao criar contato.',
        }),
        HttpStatus.BAD_REQUEST,
      );
    }

    return new ResultDto({
      success: true,
      message: 'Contato criado com sucesso.',
      data: contato,
    });
  }

  @Put(':id')
  async put(
    @Body() atualizarContatoDto: UpdateContatoDto,
    @Param('id') id: string,
  ) {
    const result = await this.service
      .updateNome(id, atualizarContatoDto)
      .catch(err => {
        const resultDto = new ResultDto({
          message: 'Erro ao atualizar contato.',
          success: false,
          errors: err,
        });
        throw new HttpException(resultDto, HttpStatus.BAD_REQUEST);
      });
    return new ResultDto({
      message: 'Contato atualizado com sucesso.',
      success: true,
      data: result,
    });
  }

  @Get(':id/telefones')
  async findTelefonesById(@Param('id') id: string) {
    return await this.service.getTelefones(id);
  }
}
