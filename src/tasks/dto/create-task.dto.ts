import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'title', description: 'title for the task' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'long description',
    description: 'description for the task',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
