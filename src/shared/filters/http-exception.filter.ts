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
    const httpArgs = host.switchToHttp();
    const response = httpArgs.getResponse<Response>();
    const request = httpArgs.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      method: request.method,
      statusCode: status,
      timestamp: new Date().toISOString(),
      params: { query: request.query, route: request.params },
      path: request.url,
      content: exception.getResponse(),
    });
  }
}
