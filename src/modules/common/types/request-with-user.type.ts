import { Request } from 'express';
import { JwtPayload } from '../../auth';

export type RequestWithUser = Request & { user: JwtPayload };
