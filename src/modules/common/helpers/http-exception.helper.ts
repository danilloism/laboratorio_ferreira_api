import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ResultDto } from '../dtos/result.dto';

export class HttpExceptionHelper {

  static throwInternalServerException(mensagem?: string, erro?: any) {
    throw new InternalServerErrorException(
      new ResultDto({
        sucesso: false,
        mensagem: mensagem || 'Falha ao realizar operação.',
        erro: erro || 'Erro desconhecido do servidor.',
      }),
    );
  }

  static throwBadRequestException(mensagem?: string, erro?: any): never {
    throw new BadRequestException(
      new ResultDto({
        sucesso: false,
        mensagem: mensagem || 'Falha ao realizar operação.',
        erro: erro || 'Bad Request',
      }),
    );
  }

  static throwForbiddenException(mensagem?: string, erro?: any): never {
    throw new ForbiddenException(
      new ResultDto({
        sucesso: false,
        mensagem: mensagem || 'Erro de autorização.',
        erro: erro || 'Você não tem autorização pra realizar essa operação.',
      }),
    );
  }

  static throwConflictException(mensagem?: string, erro?: any): never {
    throw new ConflictException(
      new ResultDto({
        sucesso: false,
        mensagem: mensagem || 'Conflito ao realizar operação.',
        erro: erro || 'Recurso já existente.',
      }),
    );
  }

  static throwNotFoundException(mensagem?: string, erro?: any): never {
    throw new NotFoundException(
      new ResultDto({
        sucesso: false,
        mensagem: mensagem || 'Falha ao realizar operação.',
        erro: erro || 'Recurso não encontrado.',
      }),
    );
  }
}
