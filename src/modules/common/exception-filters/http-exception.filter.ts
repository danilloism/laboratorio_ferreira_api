import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ResultDto } from '../dtos/result.dto';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const responseBody = exception.getResponse();
    if (!(responseBody instanceof ResultDto)) {
      return response.status(exception.getStatus()).json(
        new ResultDto({
          sucesso: false,
          mensagem: responseBody['error'],
          erro: responseBody['message'],
        }),
      );
    }

    response.status(exception.getStatus()).json(responseBody);
  }
}
