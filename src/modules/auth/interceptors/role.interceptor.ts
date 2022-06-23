import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResultDto } from '../../common/dtos/result.dto';
import { JwtPayload } from '..';
import { CategoriaEnum } from '../../agenda/contato/enums/categoria.enum';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor(...roles: CategoriaEnum[]) {
    this.roles = roles;
    roles.push(CategoriaEnum.ADMIN);
  }

  private readonly roles: CategoriaEnum[];

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const payload: JwtPayload = context.switchToHttp().getRequest().user;
    const temRole = payload.roles.every(role => this.roles.includes(role));
    if (!temRole) {
      throw new HttpException(
        new ResultDto({ sucesso: false, mensagem: 'Acesso proibido.' }),
        HttpStatus.FORBIDDEN,
      );
    }

    return next.handle();
  }
}
