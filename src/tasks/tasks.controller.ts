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
import {
  ApiBearerAuth,
  ApiTags,
  ApiQuery,
  ApiOperation,
} from '@nestjs/swagger';
import { Status } from 'generated/prisma';

@ApiTags('Tasks')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  //Create TASK
  @Post()
  @ApiOperation({
    summary: 'New task',
    description: 'Creates a new task',
  })
  create(@Body() createTaskDto: CreateTaskDto, @Request() req: any) {
    const userId = req.user.sub;
    if (!userId) throw new UnauthorizedException('User ID missing in request');
    return this.tasksService.create(createTaskDto, userId);
  }

  //FIND ALL TASKS WITH SPECIFIC STATUS
  @Get()
  @ApiQuery({
    name: 'status',
    enum: Status,
    required: true,
    description: 'Filter tasks by status: PENDING, IN_PROGRESS, or COMPLETED',
  })
  @ApiOperation({
    summary: 'Find all tasks with specific status',
    description: 'Find all tasks with specific status',
  })
  findAll(@Request() req: any, @Query('status') status: Status) {
    const userId = req.user.sub;
    return this.tasksService.findAll(userId, status);
  }

  //FIND TASK BY I
  @Get(':id')
  @ApiOperation({
    summary: 'Find specific task with ID',
    description: 'Find specific task with ID',
  })
  findOne(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.sub;
    return this.tasksService.findOne(id, userId);
  }

  //UPDATE
  @Patch(':id')
  @ApiOperation({
    summary: 'Update task',
    description: '',
  })
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: any,
  ) {
    const userId = req.user.sub;
    return this.tasksService.update(id, updateTaskDto, userId);
  }

  //DELETE
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete task',
    description: 'Delete task',
  })
  remove(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.sub;
    return this.tasksService.delete(id, userId);
  }
}
