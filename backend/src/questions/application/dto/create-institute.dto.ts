import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInstituteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Institute`s name.' })
  name: string;
  @IsString()
  @ApiProperty({ description: 'infos' })
  about: string;
  @IsString()
  @ApiProperty({ description: 'contact' })
  contact: string;
}
