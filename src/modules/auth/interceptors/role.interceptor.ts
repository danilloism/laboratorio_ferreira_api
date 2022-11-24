import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtPayload } from '..';
import { ResultDto } from '../../common/dtos/result.dto';
import { RequestWithUser } from '../../common/types/request-with-user.type';
import { getRoleIndex, Role } from '../enums/role.enum';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor(...roles: Role[]) {
    this.roles = roles;
  }

  private readonly roles: Role[];

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const payload: JwtPayload = context
      .switchToHttp()
      .getRequest<RequestWithUser>().user;
    payload.roles = payload.roles.map(role => Role[role.toString()]);
    const hierarquia = (roles: Role[]): number => {
      return roles
        .map(role => getRoleIndex(role))
        .reduce((value, element) =>
          value.valueOf() < element.valueOf()
            ? value.valueOf()
            : element.valueOf(),
        );
    };

    const hierarquiaPayload = hierarquia(payload.roles);
    const hierarquiaInterceptor = hierarquia(this.roles);
    const temRole = hierarquiaPayload <= hierarquiaInterceptor;
    if (!temRole) {
      throw new HttpException(
        new ResultDto({
          sucesso: false,
          mensagem: 'Erro ao realizar operação.',
          erro: 'Acesso proibido.',
        }),
        HttpStatus.FORBIDDEN,
      );
    }

    return next.handle();
  }
}
