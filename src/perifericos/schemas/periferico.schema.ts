import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PerifericoDocument = HydratedDocument<Periferico>;

@Schema()
export class Periferico {
  @Prop()
  nome: string;
}

export const PerifericoSchema = SchemaFactory.createForClass(Periferico);
