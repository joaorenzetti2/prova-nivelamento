import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePerifericoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;
}
