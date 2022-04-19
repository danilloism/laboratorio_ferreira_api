import { HttpStatus } from '@nestjs/common';
import { Dto } from './dto';

export class ResultDto implements Dto {
  constructor(public statusCode: HttpStatus, data?: Dto, message?: string[]) {}
}
