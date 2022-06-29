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
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Contato, Usuario } from '@prisma/client';
import { IsPublic } from '../../../auth/decorators/is-public.decorator';
import { ResultDto } from '../../../common/dtos/result.dto';
import { CreateContatoDto } from '../dtos/create-contato.dto';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';
import { UpdateContatoDto } from '../dtos/update-contato.dto';
import { UpdateUsuarioDto } from '../dtos/update-usuario.dto';
import { ContatoService } from '../services/contato.service';

@IsPublic() //TODO: retirar isso aqui depois
@ApiTags('Contatos')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('contatos')
export class ContatoController {
  constructor(private readonly contatoService: ContatoService) {
  }

  @Get()
  async get(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
  ): Promise<Contato[]> {
    return await this.contatoService.find(take, skip);
  }

  @Get(':id/account')
  async getAccount(@Param('id', ParseUUIDPipe) id: string): Promise<Usuario> {
    const account = await this.contatoService
      .procurarUsuarioPorContatoUid(id)
      .catch(err => {
        throw new HttpException(
          new ResultDto({
            sucesso: false,
            mensagem: 'Erro ao procurar por conta de usuário.',
            erro: err.message,
          }),
          err instanceof HttpException
            ? err.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    if (!account) {
      throw new NotFoundException(
        new ResultDto({
          sucesso: false,
          mensagem: 'Erro ao procurar por conta de usuário.',
          erro: 'Conta de usuário não encontrada.',
        }),
      );
    }

    return account;
  }

  @Get(':id')
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<Contato> {
    const contato = await this.contatoService.findByUid(id);

    if (!contato) {
      const result = new ResultDto({
        sucesso: false,
        mensagem: 'Erro ao procurar por contato.',
        erro: 'Contato não encontrado.',
      });

      throw new NotFoundException(result);
    }

    return contato;
  }

  @Post()
  async create(@Body() model: CreateContatoDto): Promise<ResultDto> {
    const contato = await this.contatoService.create(model).catch(err => {
      const result = new ResultDto({
        sucesso: false,
        mensagem: 'Erro ao criar contato.',
        erro: err.message,
      });

      throw new HttpException(
        result,
        err instanceof HttpException ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });

    return new ResultDto({
      sucesso: true,
      mensagem: 'Contato criado com sucesso.',
      dados: contato,
    });
  }

  @Put(':id')
  async put(
    @Body() atualizarContatoDto: UpdateContatoDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResultDto> {
    const contato = await this.contatoService
      .update(id, atualizarContatoDto)
      .catch(err => {
        const result = new ResultDto({
          sucesso: false,
          mensagem: 'Erro ao atualizar contato.',
          erro: err.message,
        });

        throw new HttpException(
          result,
          err instanceof HttpException
            ? err.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    return new ResultDto({
      mensagem: 'Contato atualizado com sucesso.',
      sucesso: true,
      dados: contato,
    });
  }

  @Post(':id/account')
  async createAccount(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createAccountDto: CreateUsuarioDto,
  ) {
    const account = await this.contatoService
      .createAccount(id, createAccountDto)
      .catch(err => {
        const result = new ResultDto({
          sucesso: false,
          mensagem: 'Erro ao criar conta de usuário.',
          erro: err.message,
        });

        throw new HttpException(
          result,
          err instanceof HttpException
            ? err.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    return new ResultDto({
      sucesso: true,
      mensagem: 'Conta de usuário criada com sucesso.',
      dados: account,
    });
  }

  @Put(':id/account')
  async updateAccount(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAccountDto: UpdateUsuarioDto,
  ) {
    const account = await this.contatoService
      .updateAccount(id, updateAccountDto)
      .catch(err => {
        const result = new ResultDto({
          sucesso: false,
          mensagem: 'Erro ao atualizar conta de usuário.',
          erro: err.message,
        });

        throw new HttpException(
          result,
          err instanceof HttpException
            ? err.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });

    return new ResultDto({
      sucesso: true,
      mensagem: 'Conta de usuário atualizada com sucesso.',
      dados: account,
    });
  }

  // @Delete(':id/account')
  // async deleteAccount(@Param('id', ParseUUIDPipe) id: string) {
  // 	await this.contatoService.deleteAccount(id).catch(err => {
  // 		const result = new ResultDto({
  // 			sucesso: false,
  // 			mensagem: 'Erro ao deletar conta de usuário.',
  // 			erro: err.message,
  // 		});
  //
  // 		throw new HttpException(
  // 			result,
  // 			err instanceof HttpException ? err.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR,
  // 		);
  // 	});
  //
  // 	return new ResultDto({
  // 		sucesso: true,
  // 		mensagem: 'Conta de usuário deletada com sucesso.',
  // 	});
  // }


  // @Patch(':id/account/recover')
  // async recoverAccount(@Param('id', ParseUUIDPipe) id: string) {
  // 	await this.contatoService.restoreAccount(id).catch(err => {
  // 		const result = new ResultDto({
  // 			sucesso: false,
  // 			mensagem: 'Erro ao recuperar conta de usuário.',
  // 			erro: err.message,
  // 		});
  //
  // 		throw new HttpException(
  // 			result,
  // 			err instanceof HttpException ? err.getStatus() : HttpStatus.BAD_REQUEST,
  // 		);
  // 	});
  //
  // 	return new ResultDto({
  // 		sucesso: true,
  // 		mensagem: 'Conta de usuário recuperada com sucesso.',
  // 	});
  // }
}
