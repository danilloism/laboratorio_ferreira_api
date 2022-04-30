import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResultDto } from '../../../../shared/dtos/result.dto';
import { UpdateContatoDto } from '../dto/update-contato.dto';
import { CreateContatoDto } from '../dto/create-contato.dto';
import { ContatoService } from '../service/contato.service';
import { HttpExceptionHelper } from '../../../../shared/helpers/http-exception.helper';

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
    const contato = await this.service.findOne(id);

    return contato ?? HttpExceptionHelper.throwNotFoundException();
  }

  @Post()
  async create(@Body() model: CreateContatoDto): Promise<ResultDto> {
    const contato = await this.service.create(model).catch(err => {
      HttpExceptionHelper.throwHttpExceptionFromHttpException(err);
    });

    return contato
      ? new ResultDto({
          sucesso: true,
          mensagem: 'Contato criado com sucesso.',
          dados: contato,
        })
      : HttpExceptionHelper.throwBadRequestException();
  }

  @Put(':id')
  async put(
    @Body() atualizarContatoDto: UpdateContatoDto,
    @Param('id') id: string,
  ): Promise<ResultDto> {
    const result = await this.service
      .update(id, atualizarContatoDto)
      .catch(err => {
        HttpExceptionHelper.throwHttpExceptionFromHttpException(err);
      });

    return new ResultDto({
      mensagem: 'Contato atualizado com sucesso.',
      sucesso: true,
      dados: result,
    });
  }
}
