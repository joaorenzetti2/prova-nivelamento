import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Periferico } from 'src/perifericos/schemas/periferico.schema';

export type ComputerDocument = HydratedDocument<Computer>;

@Schema()
export class Computer {
  @Prop()
  nome: string;

  @Prop()
  cor: string;

  @Prop()
  dataFabricacao: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Periferico' })
  perifericos: Periferico[];
}
export const ComputerSchema = SchemaFactory.createForClass(Computer);
