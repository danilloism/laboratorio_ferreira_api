import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import * as newrelic from 'newrelic';
import { Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const util = require('util');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const newrelic = require('newrelic');

@Injectable()
export class NewrelicInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return newrelic.startWebTransaction(context.getHandler().name, function () {
      // this.logger.log(
      // 	'Web transaction started.',
      // );
      const transaction = newrelic.getTransaction();

      return next.handle().pipe(() => transaction.end());
    });
  }
}
