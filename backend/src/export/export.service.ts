import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { BoardGateway } from '../board/board.gateway';
import { ExportBacklogDto } from './dto/export-backlog.dto';
import axios from 'axios';

@Injectable()
export class ExportService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private gateway: BoardGateway,
  ) {}

  async triggerExport(exportDto: ExportBacklogDto) {
    try {
      // Notificar inicio de exportación
      this.gateway.server.emit('exportStarted', {
        message: 'Iniciando exportación del backlog...',
      });

      // Obtener datos del backlog
      const tasks = await this.prisma.task.findMany({
        include: {
          column: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      // Preparar datos para N8N
      const exportData = {
        tasks: tasks.map((task) => ({
          id: task.id,
          title: task.title,
          description: task.description || '',
          column: task.column.name,
          createdAt: task.createdAt,
        })),
        email: exportDto.email,
        fields: exportDto.fields,
      };

      // Enviar datos a N8N webhook
      const n8nWebhookUrl = this.configService.get('N8N_WEBHOOK_URL') as string;
      const response = await axios.post(n8nWebhookUrl, exportData);
      if (response.status !== 200 && response.status !== 202) {
        throw new Error(
          `Failed to trigger N8N workflow. Status code: ${response.status}`,
        );
      }

      // Notificar que la exportación está en proceso
      this.gateway.server.emit('exportInProgress', {
        message:
          'Exportación en proceso. Recibirás un email cuando esté listo.',
      });

      return {
        message: 'Exportación iniciada correctamente',
        status: 'processing',
      };
    } catch (error) {
      // Notificar error
      this.gateway.server.emit('exportError', {
        message: 'Error al exportar el backlog',
        error: error instanceof Error ? error.message : String(error),
      });

      throw error;
    }
  }
}
