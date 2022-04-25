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
  Query,
} from '@nestjs/common';
import { ContatoService } from '../services/contato.service';
import { CriarContatoDto } from '../dtos/contato/criar-contato.dto';
import { ResultDto } from '../../../shared/dtos/result.dto';
import { AtualizarContatoDto } from '../dtos/contato/atualizar-contato.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Contatos')
@Controller('contatos')
export class ContatoController {
  constructor(private readonly service: ContatoService) {}
  @Get()
  async get() {
    return await this.service.get();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  @Post()
  async post(@Body() model: CriarContatoDto) {
    return await this.service.post(model);
  }

  @Put(':id')
  async put(
    @Body() atualizarContatoDto: AtualizarContatoDto,
    @Param('id') id: string,
  ) {
    const result = await this.service
      .put(id, atualizarContatoDto)
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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
  }

  @Get(':id/telefones')
  async findTelefonesById(@Param('id') id: string) {
    return await this.service.findTelefones(id);
  }
}
