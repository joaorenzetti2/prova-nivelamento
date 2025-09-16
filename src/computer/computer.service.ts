import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Computer } from './schemas/computer.schema';
import { Model } from 'mongoose';
import { CreateComputerDto } from './dto/create-computer.dto';
import { UpdateComputerDto } from './dto/update-computer.dto';
import { Periferico } from 'src/perifericos/schemas/periferico.schema';

@Injectable()
export class ComputerService {
  constructor(
    @InjectModel(Computer.name) private readonly computerModel: Model<Computer>,
    @InjectModel(Periferico.name)
    private readonly perifericoModel: Model<Periferico>,
  ) {}

  async create(createComputerDto: CreateComputerDto): Promise<Computer> {
    const createdComputer = new this.computerModel(createComputerDto);
    return createdComputer.save();
  }

  async findAll(): Promise<Computer[]> {
    return this.computerModel.find().populate('perifericos').exec();
  }

  async findById(id: string): Promise<Computer> {
    const computer = await this.computerModel
      .findById(id)
      .populate('perifericos');

    if (!computer) {
      throw new NotFoundException(`Computador com id:${id} não foi encontrado`);
    }

    return computer;
  }

  async update(
    id: string,
    updateComputerDto: UpdateComputerDto,
  ): Promise<Computer> {
    const updatedComputer = await this.computerModel.findByIdAndUpdate(
      id,
      updateComputerDto,
    );

    if (!updatedComputer) {
      throw new NotFoundException(`Computador com id:${id} não encontrado`);
    }

    return updatedComputer;
  }

  async delete(id: string) {
    const deletedComputer = await this.computerModel
      .deleteOne({ _id: id })
      .exec();

    if (deletedComputer.deletedCount === 0) {
      throw new NotFoundException(`Computador com id: ${id} não encontrado`);
    }

    return deletedComputer;
  }

  async addPeriferico(
    computerId: string,
    perifericoId: string,
  ): Promise<Computer> {
    const computer = await this.computerModel.findById(computerId).exec();
    const periferico = await this.perifericoModel.findById(perifericoId).exec();

    if (!computer) {
      throw new NotFoundException('Computador não encontrado.');
    }
    if (!periferico) {
      throw new NotFoundException('Periférico não encontrado.');
    }

    // atualiza o computer com o novo periferico
    const updatedComputer = await this.computerModel
      .findById(computerId)
      .populate('perifericos')
      .exec();

    if (!updatedComputer) {
      throw new NotFoundException('Computador não encontrado.');
    }

    return updatedComputer;
  }

  async removePeriferico(
    computerId: string,
    perifericoId: string,
  ): Promise<Computer> {
    const computer = await this.computerModel.findById(computerId).exec();

    if (!computer) {
      throw new NotFoundException('Computador não encontrado.');
    }

    computer.perifericos = computer.perifericos.filter(
      (id) => id.toString() !== perifericoId,
    );
    await computer.save();

    return computer;
  }
}
