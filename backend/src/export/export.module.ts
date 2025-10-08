import { Module } from '@nestjs/common';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';
import { PrismaModule } from '../prisma/prisma.module';
import { BoardModule } from '../board/board.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, BoardModule, ConfigModule],
  controllers: [ExportController],
  providers: [ExportService],
})
export class ExportModule {}
