import { Module } from '@nestjs/common';
import { ComputerModule } from './computer/computer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PerifericoModule } from './perifericos/perifericos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/prova-nivelamento'),
    ComputerModule,
    PerifericoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
