import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { MessageDTO } from './message.dto';

@WebSocketGateway({ namespace: '/chat' })
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  // Init WebSocket server
  @WebSocketServer() server: Server;

  // Init logger
  private logger: Logger = new Logger(MessagesGateway.name);

  public afterInit(): void {
    return this.logger.log('Init');
  }

  @SubscribeMessage('msgToServer')
  handleMessage(@MessageBody() data: MessageDTO): void {
    this.server.to(data.room).emit('msgToClient', data);
  }

  @SubscribeMessage('joinRoom')
  public joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ): void {
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  public leaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ): void {
    client.leave(room);
    client.emit('leftRoom', room);
  }

  public handleDisconnect(@ConnectedSocket() client: Socket): void {
    return this.logger.log(`Client: ${client.id} disconnected`);
  }

  public handleConnection(@ConnectedSocket() client: Socket): void {
    return this.logger.log(`Client: ${client.id} connected`);
  }
}
