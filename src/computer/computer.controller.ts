import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ComputerService } from './computer.service';
import { CreateComputerDto } from './dto/create-computer.dto';
import { Computer } from './schemas/computer.schema';
import { UpdateComputerDto } from './dto/update-computer.dto';
import { CreatePerifericoDto } from 'src/perifericos/dto/create-periferico.dto';

@Controller('computer')
export class ComputerController {
  constructor(private readonly computerService: ComputerService) {}

  @Post()
  async create(
    @Body() createComputerDto: CreateComputerDto,
  ): Promise<Computer> {
    return this.computerService.create(createComputerDto);
  }

  @Get()
  async findAll(): Promise<Computer[]> {
    return this.computerService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Computer> {
    return this.computerService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateComputerDto: UpdateComputerDto,
  ): Promise<Computer> {
    return this.computerService.update(id, updateComputerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.computerService.delete(id);
  }

  // agora pode criar varios perifericos com um id do computer
  @Post(':computerId/perifericos')
  async addPeriferico(
    @Param('computerId') computerId: string,
    @Body() createPerifericoDto: CreatePerifericoDto,
  ) {
    return this.computerService.addPeriferico(computerId, createPerifericoDto);
  }

  @Delete(':computadorId/perifericos/:perifericoId')
  async removePeriferico(
    @Param('computadorId') computerId: string,
    @Param('perifericoId') perifericoId: string,
  ) {
    return await this.computerService.removePeriferico(
      computerId,
      perifericoId,
    );
  }
}
