// schemas/counter.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Counter extends Document {
  @Prop({ required: true, unique: true })
  collectionName: string;

  @Prop({ required: true })
  seq: number = 0;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
