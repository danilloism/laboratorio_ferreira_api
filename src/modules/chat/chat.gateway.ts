import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Account } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { ChatEmitMessageName } from './chat-emit-message-name.enum';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  constructor(private readonly chatService: ChatService) {}
  private user: Account;

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(ChatEmitMessageName.SEND_MESSAGE)
  listenForMessages(@MessageBody() message: string) {
    this.server.sockets.emit(ChatEmitMessageName.RECEIVE_MESSAGE, {
      message,
      author: this.user,
    });
  }

  async handleConnection(socket: Socket) {
    this.user = await this.chatService.getUserFromSocket(socket);
  }
}
