import { HttpException, HttpStatus } from '@nestjs/common';
import { ResultDto } from './result.dto';

export class ServiceHttpExceptionDto extends HttpException {
  constructor(message: string, status: HttpStatus) {
    let result = new ResultDto({ error: message, success: false });
    super(result, status);
  }
}
