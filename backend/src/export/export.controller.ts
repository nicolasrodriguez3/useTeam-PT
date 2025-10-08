import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportBacklogDto } from './dto/export-backlog.dto';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Post('board')
  @HttpCode(202) // Accepted
  async exportBacklog(@Body() exportDto: ExportBacklogDto) {
    return await this.exportService.triggerExport(exportDto);
  }
}
