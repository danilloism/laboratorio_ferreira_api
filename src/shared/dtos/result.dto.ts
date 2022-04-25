export class ResultDto {
  constructor(info: {
    success: boolean;
    message?: string;
    data?: any;
    errors?: any;
  }) {
    this.success = info.success;
    this.message = info.message;
    this.data = info.data;
    this.errors = info.errors;
  }

  readonly success: boolean;
  readonly message?: string;
  readonly data?: any;
  readonly errors?: any;
}
