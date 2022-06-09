import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResultDto } from '../../../../shared/dtos/result.dto';
import { UpdateContatoDto } from '../dto/update-contato.dto';
import { CreateContatoDto } from '../dto/create-contato.dto';
import { ContatoService } from '../service/contato.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { IsPublic } from '../../../sistema/auth/decorators/is-public.decorator';
import { Contato, Usuario } from '@prisma/client';

@IsPublic()
@ApiTags('Contatos')
@Controller('contatos')
export class ContatoController {
  constructor(private readonly contatoService: ContatoService) {}

  @Get()
  async get(): Promise<Contato[]> {
    return await this.contatoService.find();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id/account')
  async getAccount(@Param('id') id: string): Promise<Usuario> {
    const account = await this.contatoService.getAccount(id).catch(err => {
      throw new HttpException(
        new ResultDto({
          sucesso: false,
          mensagem: 'Erro ao procurar por conta de usuário.',
          erro: err.message,
        }),
        err instanceof HttpException ? err.getStatus() : HttpStatus.BAD_REQUEST,
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

    delete account.senha;
    return account;
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Contato> {
    const contato = await this.contatoService.findById(id);

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
        err instanceof HttpException ? err.getStatus() : HttpStatus.BAD_REQUEST,
      );
    });

    delete contato.usuario?.senha;
    return new ResultDto({
      sucesso: true,
      mensagem: 'Contato criado com sucesso.',
      dados: contato,
    });
  }

  @Put(':id')
  async put(
    @Body() atualizarContatoDto: UpdateContatoDto,
    @Param('id') id: string,
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
            : HttpStatus.BAD_REQUEST,
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
    @Param('id') id: string,
    @Body() createAccountDto: CreateAccountDto,
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
            : HttpStatus.BAD_REQUEST,
        );
      });

    delete account.senha;
    return new ResultDto({
      sucesso: true,
      mensagem: 'Conta de usuário criada com sucesso.',
      dados: account,
    });
  }

  @Post(':id/account')
  async updateAccount(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
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
            : HttpStatus.BAD_REQUEST,
        );
      });

    delete account.senha;
    return new ResultDto({
      sucesso: true,
      mensagem: 'Conta de usuário atualizada com sucesso.',
      dados: account,
    });
  }

  @Delete(':id/account')
  async deleteAccount(@Param('id') id: string) {
    await this.contatoService.deleteAccount(id).catch(err => {
      const result = new ResultDto({
        sucesso: false,
        mensagem: 'Erro ao deletar conta de usuário.',
        erro: err.message,
      });

      throw new HttpException(
        result,
        err instanceof HttpException ? err.getStatus() : HttpStatus.BAD_REQUEST,
      );
    });

    return new ResultDto({
      sucesso: true,
      mensagem: 'Conta de usuário deletada com sucesso.',
    });
  }
}
