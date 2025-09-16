import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Periferico, PerifericoSchema } from './schemas/periferico.schema';
import { PerifericoController } from './perifericos.controller';
import { PerifericoService } from './perifericos.services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Periferico.name, schema: PerifericoSchema },
    ]),
  ],
  controllers: [PerifericoController],
  providers: [PerifericoService],
  exports: [MongooseModule, PerifericoService],
})
export class PerifericoModule {}
