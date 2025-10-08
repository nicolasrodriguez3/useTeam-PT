import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { BoardModule } from '../board/board.module';
import { ColumnsModule } from '../columns/columns.module';

@Module({
  imports: [PrismaModule, BoardModule, ColumnsModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
