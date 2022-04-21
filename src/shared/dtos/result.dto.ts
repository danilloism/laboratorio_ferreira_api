import { HttpStatus } from '@nestjs/common';

type ResultDtoParams = {
  message?: string;
  success: boolean;
  data?: any;
  error?: string;
};

export class ResultDto {
  constructor({ message, success, data, error }: ResultDtoParams) {}
}
