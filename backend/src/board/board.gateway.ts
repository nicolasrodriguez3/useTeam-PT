import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';

@WebSocketGateway({ cors: true })
export class BoardGateway {
  @WebSocketServer() server: Server;

  constructor(private prisma: PrismaService) {}

  async emitBoardUpdate() {
    const board = await this.prisma.column.findMany({
      include: { tasks: true },
      orderBy: { position: 'asc' },
    });
    this.server.emit('boardUpdate', board);
  }
}
