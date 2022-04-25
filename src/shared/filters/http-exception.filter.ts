import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const connection = host.switchToHttp();
    const response = connection.getResponse<Response>();
    const request = connection.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      method: request.method,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      content: exception.getResponse(),
    });
  }
}
