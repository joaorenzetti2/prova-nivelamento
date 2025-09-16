import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Computer } from './schemas/computer.schema';
import { Model } from 'mongoose';
import { CreateComputerDto } from './dto/create-computer.dto';
import { UpdateComputerDto } from './dto/update-computer.dto';
import { Periferico } from 'src/perifericos/schemas/periferico.schema';
import { CreatePerifericoDto } from 'src/perifericos/dto/create-periferico.dto';

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
    createPerifericoDto: CreatePerifericoDto,
  ): Promise<Computer> {
    const computer = await this.computerModel.findById(computerId).exec();

    if (!computer) {
      throw new NotFoundException('Computador não encontrado.');
    }

    const periferico = await this.perifericoModel.create(createPerifericoDto);
    computer.perifericos.push(periferico._id);
    await computer.save();

    return this.computerModel
      .findById(computerId)
      .populate('perifericos')
      .orFail(new NotFoundException(`Computador não encontrado`))
      .exec();
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

    // retorna o computador e se caso não achar lança a exception
    return this.computerModel
      .findById(computerId)
      .populate('perifericos')
      .orFail(new NotFoundException(`Computador não encontrado`))
      .exec();
  }
}
