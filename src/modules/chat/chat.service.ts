import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from '../auth';

@Injectable()
export class ChatService {
  constructor(private readonly authService: AuthService) {}

  async getUserFromSocket(socket: Socket) {
    const authHeader = socket.handshake.headers.authorization.split(' ')[1];
    const user = await this.authService.getUserFromJwt(authHeader);

    if (!user) {
      throw new WsException('Credenciais inválidas.');
    }

    return user;
  }
}
