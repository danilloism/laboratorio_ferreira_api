import {
  Body,
  ClassSerializerInterceptor,
  ConflictException,
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
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '@prisma/client';
import { RequestWithUser } from 'src/modules/common/types/request-with-user.type';
import { DentistaEspOdontRoleInterceptor } from '../../auth/interceptors/dentista-esp-odont-role.interceptor';
import { GerenteRoleInterceptor } from '../../auth/interceptors/gerente-role.interceptor';
import { ResultDto } from '../../common/dtos/result.dto';
import { AdicionarTelefonesDto } from '../dtos/add-telefones.dto';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { CreateContatoDto } from '../dtos/create-contato.dto';
import { UpdateContatoDto } from '../dtos/update-contato.dto';
import { UpdateUsuarioDto } from '../dtos/update-usuario.dto';
import AccountEntity from '../entities/account.entity';
import ContatoEntity from '../entities/contato.entity';
import { ContatoService } from '../services/contato.service';

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
  @UseInterceptors(GerenteRoleInterceptor, DentistaEspOdontRoleInterceptor)
  async getContatos(
    @Query('take') take?: number,
    @Query('skip') skip?: number,
    @Query('nome') nome?: string,
  ): Promise<ResultDto<ContatoEntity[]>> {
    const contatos = await this.contatoService.findContatos(take, skip, nome);
    return new ResultDto({ sucesso: true, dados: contatos });
  }

  @Get(':id')
  async getContatoById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResultDto<ContatoEntity>> {
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
  ): Promise<ResultDto<ContatoEntity>> {
    const contato = await this.contatoService
      .createContato(model)
      .catch(err => {
        const result = new ResultDto({
          sucesso: false,
          mensagem: 'Erro ao criar contato.',
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
  ): Promise<ResultDto<ContatoEntity>> {
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
  ): Promise<AccountEntity> {
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
  ): Promise<ResultDto<AccountEntity>> {
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
  ): Promise<ResultDto<AccountEntity>> {
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
    @Req() request: RequestWithUser,
  ): Promise<ResultDto> {
    if (
      id == request.user.sub &&
      request.user.roles.find(
        role =>
          role == RoleEnum.COLABORADOR ||
          role == RoleEnum.ADMIN ||
          role == RoleEnum.GERENTE,
      )
    ) {
      throw new ConflictException(
        new ResultDto({
          sucesso: false,
          mensagem: 'Erro ao deletar conta de usuário',
          erro: 'Colaboradores, administradores ou gerentes não pode deletar a própria conta.',
        }),
      );
    }

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
