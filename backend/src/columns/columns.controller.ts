import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { RenameColumnDto } from './dto/rename-column.dto';

@Controller('columns')
@UsePipes(new ValidationPipe({ transform: true }))
export class ColumnsController {
  constructor(private service: ColumnsService) {}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Post()
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.service.create(createColumnDto.name);
  }

  @Patch(':id')
  rename(@Param('id') id: string, @Body() renameColumnDto: RenameColumnDto) {
    return this.service.rename(id, renameColumnDto.name);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
