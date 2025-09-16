import { Module } from '@nestjs/common';
import { ComputerService } from './computer.service';
import { ComputerController } from './computer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Computer, ComputerSchema } from './schemas/computer.schema';
import { PerifericoModule } from 'src/perifericos/perifericos.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Computer.name, schema: ComputerSchema },
    ]),
    PerifericoModule,
  ],
  controllers: [ComputerController],
  providers: [ComputerService],
})
export class ComputerModule {}
