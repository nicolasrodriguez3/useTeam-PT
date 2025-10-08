import {
  Controller,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';

@Controller('tasks')
@UsePipes(new ValidationPipe({ transform: true }))
export class TasksController {
  constructor(private service: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.service.create(createTaskDto.title, createTaskDto.columnId);
  }

  @Patch(':id/move')
  move(@Param('id') id: string, @Body() moveTaskDto: MoveTaskDto) {
    return this.service.moveTask(
      id,
      moveTaskDto.columnId,
      moveTaskDto.position,
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Get()
  getAll() {
    return this.service.getAll();
  }
}
