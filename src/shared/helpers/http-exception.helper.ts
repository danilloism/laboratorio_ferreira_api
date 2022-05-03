import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { ResultDto } from '../dtos/result.dto';

export class HttpExceptionHelper {
  static throwHttpExceptionFromHttpException(
    err: any,
    mensagem?: string,
    altErro?: any,
    status?: number,
  ): never {
    if (!(err instanceof HttpException)) {
      throw new TypeError('Exceção não é do tipo HttpException.');
    }

    if (err instanceof NotFoundException) {
      this.throwNotFoundException(mensagem, altErro);
    }

    if (err instanceof BadRequestException) {
      this.throwBadRequestException(mensagem, altErro);
    }

    const erroConvertido: HttpException = err;
    const result = new ResultDto({
      sucesso: false,
      mensagem: mensagem || 'Erro ao realizar operação.',
      erro: altErro || erroConvertido.getResponse(),
    });

    throw new HttpException(result, status || erroConvertido.getStatus());
  }

  static throwBadRequestException(message?: string, erro?: any): never {
    throw new BadRequestException(
      new ResultDto({
        sucesso: false,
        mensagem: message || 'Falha ao realizar operação.',
        erro,
      }),
    );
  }

  static throwForbiddenException(message?: string, erro?: any): never {
    throw new ForbiddenException(
      new ResultDto({
        sucesso: false,
        mensagem: message || 'Erro de autorização.',
        erro,
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
