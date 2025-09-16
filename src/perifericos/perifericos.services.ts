import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Periferico } from './schemas/periferico.schema';
import { Model } from 'mongoose';
import { CreatePerifericoDto } from './dto/create-periferico.dto';
import { UpdatePerifericoDto } from './dto/update-periferico.dto';

@Injectable()
export class PerifericoService {
  constructor(
    @InjectModel(Periferico.name) private perifericoModel: Model<Periferico>,
  ) {}

  async createPeriferico(
    createPerifericoDto: CreatePerifericoDto,
  ): Promise<Periferico> {
    const createdPeriferico = new this.perifericoModel(createPerifericoDto);
    return createdPeriferico.save();
  }

  async findAllPerifericos(): Promise<Periferico[]> {
    return this.perifericoModel.find();
  }

  async findByIdPeriferico(id: string): Promise<Periferico> {
    const periferico = await this.perifericoModel.findById(id).exec();
    if (!periferico) {
      throw new NotFoundException(`Periferico com id:${id} não encontrado`);
    }
    return periferico;
  }

  async updatePeriferico(
    id: string,
    updatePerifericoDto: UpdatePerifericoDto,
  ): Promise<Periferico> {
    const updatedPeriferico = await this.perifericoModel.findByIdAndUpdate(
      id,
      updatePerifericoDto,
    );
    if (!updatedPeriferico) {
      throw new NotFoundException(`Periferico com id:${id} não encontrado`);
    }
    return updatedPeriferico;
  }

  async deletePeriferico(id: string) {
    const deletedComputer = await this.perifericoModel
      .deleteOne({ _id: id })
      .exec();
    if (deletedComputer.deletedCount) {
      throw new NotFoundException(`Periferico com id:${id} não encontrado`);
    }
    return deletedComputer;
  }
}
