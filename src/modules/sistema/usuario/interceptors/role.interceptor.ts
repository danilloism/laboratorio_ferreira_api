import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResultDto } from '../../../../shared/dtos/result.dto';
import { JwtPayload } from '../../auth';
import { Role } from '../enums/role.enum';

@Injectable()
export class RoleInterceptor implements NestInterceptor {
  constructor(public readonly roles: Role[]) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const payload: JwtPayload = context.switchToHttp().getRequest().user;
    const temRole = this.roles.includes(payload.role);
    if (!temRole) {
      throw new HttpException(
        new ResultDto({ success: false, message: 'Acesso não autorizado.' }),
        HttpStatus.FORBIDDEN,
      );
    }

    return next.handle();
  }
}
