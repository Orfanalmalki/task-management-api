import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Status } from 'generated/prisma';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string, status: Status, skip: number, take: number) {
    return this.prisma.task.findMany({
      where: { userId, status },
      skip,
      take,
    });
  }

  async findOne(id: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) throw new NotFoundException('Task not found');
    if (task.userId !== userId) throw new ForbiddenException('Access denied');

    return task;
  }

  async create(dto: CreateTaskDto, userId: string) {
    console.log('Creating task for userId:', userId);
    return this.prisma.task.create({
      data: {
        ...dto,
        status: 'PENDING',
        userId,
      },
    });
  }

  async update(id: string, dto: UpdateTaskDto, userId: string) {
    await this.findOne(id, userId);
    return this.prisma.task.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.prisma.task.delete({ where: { id } });
  }
}
