import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Categoria } from '@prisma/client';
import { Observable } from 'rxjs';
import { ResultDto } from '../../../../shared/dtos/result.dto';
import { JwtPayload } from '..';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor(...roles: Categoria[]) {
    this.roles = roles;
    roles.push('admin');
  }

  protected readonly roles: Categoria[];

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const payload: JwtPayload = context.switchToHttp().getRequest().user;
    const temRole = payload.roles.every(role => this.roles.includes(role));
    if (!temRole) {
      throw new HttpException(
        new ResultDto({ sucesso: false, mensagem: 'Acesso não autorizado.' }),
        HttpStatus.FORBIDDEN,
      );
    }

    return next.handle();
  }
}
