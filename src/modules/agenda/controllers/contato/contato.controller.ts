import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ContatoService } from '../../../agenda/services/contato/contato.service';
import { CriarContatoDto } from '../../dtos/contato/criar-contato.dto';
import { ResultDto } from '../../../../shared/dtos/result.dto';
import { AtualizarContatoDto } from '../../dtos/contato/atualizar-contato.dto';

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
  async put(@Body() model: AtualizarContatoDto, @Param('id') id: string) {
    const result = await this.service.put(id, model);
    return new ResultDto(HttpStatus.OK); //TODO
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
  }
}
