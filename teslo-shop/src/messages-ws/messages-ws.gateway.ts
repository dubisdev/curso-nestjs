import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { MessageDto } from './dto/message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/interfaces';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  wss: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify<JwtPayload>(token);
      console.log('Client connected:', client.id, payload);
      await this.messagesWsService.registerClient(client, payload.id);
    } catch (error) {
      console.error('Invalid token:', error);
      client.disconnect();
      return;
    }

    this.wss.emit('clients-updated', {
      connectedClients: this.messagesWsService.getConnectedClients(),
    });
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);

    this.wss.emit('clients-updated', {
      connectedClients: this.messagesWsService.getConnectedClients(),
    });
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: MessageDto): void {
    console.log({ clientId: client.id, payload });

    // Emit to client that sent the message
    // client.emit('message-from-server', {
    //   fullName: 'Server',
    //   message: payload.message,
    // });

    // Emit to al except the client that sent the message
    // client.broadcast.emit('message-from-server', {
    //   fullName: 'Server',
    //   message: payload.message,
    // });

    // Emit to all clients
    this.wss.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullName(client.id),
      message: payload.message,
    });
  }
}
