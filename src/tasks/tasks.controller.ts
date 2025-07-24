/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { Status } from 'generated/prisma';

@ApiTags('Tasks')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req: any) {
    const userId = req.user.sub;
    if (!userId) throw new UnauthorizedException('User ID missing in request');
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  @ApiQuery({
    name: 'status',
    enum: Status,
    required: true,
    description: 'Filter tasks by status: PENDING, IN_PROGRESS, or COMPLETED',
  })
  findAll(
    @Request() req: any,
    @Query('status') status: Status,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    const userId = req.user.sub;
    const skip = (page - 1) * limit;
    return this.tasksService.findAll(userId, status, skip, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.sub;
    return this.tasksService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: any,
  ) {
    const userId = req.user.sub;
    return this.tasksService.update(id, updateTaskDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.sub;
    return this.tasksService.delete(id, userId);
  }
}
