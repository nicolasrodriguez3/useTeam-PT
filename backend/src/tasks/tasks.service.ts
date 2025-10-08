import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BoardGateway } from '../board/board.gateway';
import { ColumnsService } from '../columns/columns.service';
import {
  EntityNotFoundException,
  InvalidPositionException,
} from '../common/exceptions/kanban.exceptions';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private gateway: BoardGateway,
    private columnsService: ColumnsService,
  ) {}

  async getAll() {
    return this.prisma.task.findMany({
      orderBy: { position: 'asc' },
    });
  }

  async create(title: string, columnId: string) {
    const position = await this.prisma.task.count({ where: { columnId } });
    const task = await this.prisma.task.create({
      data: { title, columnId, position },
    });
    await this.gateway.emitBoardUpdate();
    return task;
  }

  async moveTask(taskId: string, columnId: string, position: number) {
    // Verificar que la tarea existe
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new EntityNotFoundException('Tarea', taskId);
    }

    // La columna ya se verifica en columnsService.getById()
    await this.columnsService.getById(columnId);

    // Verificar que la posición es válida
    const tasksCount = await this.prisma.task.count({
      where: { columnId },
    });

    if (position > tasksCount) {
      throw new InvalidPositionException(
        'La posición excede el número de tareas en la columna',
      );
    }

    await this.prisma.task.update({
      where: { id: taskId },
      data: { columnId, position },
    });
    await this.gateway.emitBoardUpdate();
  }

  async delete(id: string) {
    await this.prisma.task.delete({ where: { id } });
    await this.gateway.emitBoardUpdate();
  }
}
