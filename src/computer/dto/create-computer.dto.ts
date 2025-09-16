import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateComputerDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cor: string;

  @IsNumber()
  @IsNotEmpty()
  dataFabricacao: number;
}
