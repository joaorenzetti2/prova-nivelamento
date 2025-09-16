import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ComputerDocument = HydratedDocument<Computer>;

@Schema()
export class Computer {
  @Prop()
  nome: string;

  @Prop()
  cor: string;

  @Prop()
  dataFabricacao: number;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Periferico',
    default: [], // inicializa o periferico como array vazio
  })
  perifericos: mongoose.Types.ObjectId[];
}
export const ComputerSchema = SchemaFactory.createForClass(Computer);
