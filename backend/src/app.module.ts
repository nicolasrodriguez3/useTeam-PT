import { Module } from '@nestjs/common';
import { ColumnsModule } from './columns/columns.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { HealthController } from './health/health.controller';
import { BoardModule } from './board/board.module';
import { ExportModule } from './export/export.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BoardModule,
    ColumnsModule,
    TasksModule,
    ExportModule,
  ],
  providers: [PrismaService],
  controllers: [HealthController],
})
export class AppModule {}
