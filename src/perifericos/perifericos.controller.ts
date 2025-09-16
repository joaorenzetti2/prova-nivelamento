import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePerifericoDto } from './dto/create-periferico.dto';
import { PerifericoService } from './perifericos.services';
import { UpdatePerifericoDto } from './dto/update-periferico.dto';

@Controller('perifericos')
export class PerifericoController {
  constructor(private readonly perifericoService: PerifericoService) {}

  @Post()
  async createPeriferico(@Body() createPerifericoDto: CreatePerifericoDto) {
    return this.perifericoService.createPeriferico(createPerifericoDto);
  }

  @Get()
  async findAllPerifericos() {
    return this.perifericoService.findAllPerifericos();
  }

  @Get(':id')
  async findByIdPeriferico(@Param('id') id: string) {
    return this.perifericoService.findByIdPeriferico(id);
  }

  @Put(':id')
  async updatePeriferico(
    @Param('id') id: string,
    @Body() updatePerifericoDto: UpdatePerifericoDto,
  ) {
    return this.perifericoService.updatePeriferico(id, updatePerifericoDto);
  }

  @Delete(':id')
  async deletePeriferico(@Param('id') id: string) {
    return this.perifericoService.deletePeriferico(id);
  }
}
