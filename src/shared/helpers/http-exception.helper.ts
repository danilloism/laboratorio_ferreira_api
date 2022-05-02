import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { ResultDto } from '../dtos/result.dto';

export class HttpExceptionHelper {
  static throwHttpExceptionFromHttpException(err: any): never {
    if (!(err instanceof HttpException)) {
      throw new TypeError('Exceção não é do tipo HttpException.');
    }

    const erro: HttpException = err;
    const result = new ResultDto({
      sucesso: false,
      mensagem: 'Erro ao realizar operação.',
      erro: erro.getResponse(),
    });

    throw new HttpException(result, erro.getStatus());
  }

  static throwBadRequestException(message?: string): never {
    throw new BadRequestException(
      new ResultDto({
        sucesso: false,
        mensagem: message || 'Falha desconhecida ao realizar operação.',
      }),
    );
  }

  static throwNotFoundException(message?: string): never {
    throw new NotFoundException(
      new ResultDto({
        sucesso: false,
        mensagem: message || 'Recurso não encontrado.',
      }),
    );
  }
}
