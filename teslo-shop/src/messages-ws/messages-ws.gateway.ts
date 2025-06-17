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

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  wss: Server;

  constructor(private readonly messagesWsService: MessagesWsService) {}

  handleConnection(client: Socket) {
    this.messagesWsService.registerClient(client);

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
  }
}
