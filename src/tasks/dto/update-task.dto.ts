import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ example: 'updated title of task' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'pending, in_progress or completed' })
  @IsOptional()
  @IsIn(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}
