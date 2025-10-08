import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BoardGateway } from '../board/board.gateway';
import { EntityNotFoundException } from '../common/exceptions/kanban.exceptions';

@Injectable()
export class ColumnsService {
  constructor(
    private prisma: PrismaService,
    private gateway: BoardGateway,
  ) {}

  async getAll() {
    return this.prisma.column.findMany({
      include: { tasks: true },
      orderBy: { position: 'asc' },
    });
  }

  async getById(id: string) {
    const column = await this.prisma.column.findUnique({
      where: { id },
      include: { tasks: true },
    });

    if (!column) {
      throw new EntityNotFoundException('Columna', id);
    }

    return column;
  }

  async create(name: string) {
    const position = await this.prisma.column.count();
    const column = await this.prisma.column.create({
      data: { name, position },
    });
    await this.gateway.emitBoardUpdate();
    return column;
  }

  async rename(id: string, name: string) {
    const column = await this.prisma.column.update({
      where: { id },
      data: { name },
    });
    await this.gateway.emitBoardUpdate();
    return column;
  }

  async delete(id: string) {
    await this.prisma.column.delete({ where: { id } });
    await this.gateway.emitBoardUpdate();
  }
}
