import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResultDto } from '../../../../shared/dtos/result.dto';
import { AtualizarContatoDto } from '../dto/atualizar-contato.dto';
import { CriarContatoDto } from '../dto/criar-contato.dto';
import { ContatoService } from '../service/contato.service';


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
