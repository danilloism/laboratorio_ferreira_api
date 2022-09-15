import { Module } from '@nestjs/common';
import { AuthModule } from '../auth';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({ providers: [ChatGateway, ChatService], imports: [AuthModule] })
export class ChatModule {}
