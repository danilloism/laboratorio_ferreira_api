import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Contato } from '@prisma/client';
import { IsPublic } from '../../auth/decorators/is-public.decorator';
import { ResultDto } from '../../common/dtos/result.dto';
import { AdicionarTelefonesDto } from '../dtos/add-telefones.dto';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { CreateContatoDto } from '../dtos/create-contato.dto';
import { UpdateContatoDto } from '../dtos/update-contato.dto';
import { UpdateUsuarioDto } from '../dtos/update-usuario.dto';
import { ContatoService } from '../services/contato.service';
import { AccountType } from '../types/account.type';

@IsPublic() //TODO: retirar isso aqui depois
@ApiTags('Contatos')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('contatos')
export class ContatoController {
  constructor(private readonly contatoService: ContatoService) {}

  //#region CONTATOS

  @ApiQuery({ name: 'take', required: false })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'nome', required: false })
  @Get()
  async getContatos(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('nome') nome?: string,
  ): Promise<ResultDto<Contato[]>> {
    const contatos = await this.contatoService.findContatos(take, skip, nome);
    return new ResultDto({ sucesso: true, dados: contatos });
  }

  @Get(':id')
  async getContatoById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResultDto<Contato>> {
    const contato = await this.contatoService.findContatoByUid(id);

    if (!contato) {
      const result = new ResultDto({
        sucesso: false,
        mensagem: 'Erro ao procurar por agenda.',
        erro: 'Contato não encontrado.',
      });

      throw new NotFoundException(result);
    }

    return new ResultDto({
      sucesso: true,
      dados: contato,
    });
  }

  @Post()
  async createContato(
    @Body() model: CreateContatoDto,
  ): Promise<ResultDto<Contato>> {
    const contato = await this.contatoService
      .createContato(model)
      .catch(err => {
        const result = new ResultDto({
          sucesso: false,
          mensagem: 'Erro ao criar agenda.',
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
      mensagem: 'Contato criado com sucesso.',
      dados: contato,
    });
  }

  @Put(':id')
  async updateContato(
    @Body() atualizarContatoDto: UpdateContatoDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResultDto<Contato>> {
    const contato = await this.contatoService
      .updateContato(id, atualizarContatoDto)
      .catch(err => {
        const result = new ResultDto({
          sucesso: false,
          mensagem: 'Erro ao atualizar agenda.',
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

  @Post(':id/telefones')
  async adicionarTelefones(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() adicionarTelefonesDto: AdicionarTelefonesDto,
  ) {
    const contato = await this.contatoService
      .adicionarTelefones(id, adicionarTelefonesDto.telefones)
      .catch(err => {
        const result = new ResultDto({
          sucesso: false,
          mensagem: 'Erro ao adicionar telefones.',
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
      mensagem: 'Telefones adicionados com sucesso.',
      sucesso: true,
      dados: contato.telefones,
    });
  }

  //#endregion CONTATOS

  //#region ACCOUNT

  @Get(':id/account')
  async getAccount(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AccountType> {
    const account = await this.contatoService
      .findAccountByContatoUid(id)
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

  @Post(':id/account')
  async createAccount(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<ResultDto<AccountType>> {
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
  ): Promise<ResultDto<AccountType>> {
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

  @Delete(':id/account')
  async deleteAccount(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResultDto> {
    const deletado = await this.contatoService.deleteAccount(id);

    if (!deletado) {
      throw new InternalServerErrorException(
        new ResultDto({
          sucesso: false,
          mensagem: 'Erro ao excluir conta de usuário',
          erro: 'Erro desconhecido.',
        }),
      );
    }

    return new ResultDto({
      sucesso: true,
      mensagem: 'Conta de usuário excluída com sucesso.',
    });
  }

  //#endregion ACCOUNT
}
