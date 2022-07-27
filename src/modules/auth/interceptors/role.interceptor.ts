import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { RoleEnum } from '@prisma/client';
import { Observable } from 'rxjs';
import { JwtPayload } from '..';
import { ResultDto } from '../../common/dtos/result.dto';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor(...roles: RoleEnum[]) {
    this.roles = roles;
    roles.push(RoleEnum.ADMIN);
  }

  private readonly roles: RoleEnum[];

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const payload: JwtPayload = context.switchToHttp().getRequest().user;
    const temRole = payload.roles.every(role => this.roles.includes(role));
    if (!temRole) {
      throw new HttpException(
        new ResultDto({
          sucesso: false,
          mensagem: 'Acesso proibido.',
        }),
        HttpStatus.FORBIDDEN,
      );
    }

    return next.handle();
  }
}
