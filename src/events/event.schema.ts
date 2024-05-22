import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
interface Participants {
  name: string;
  email: string;
}
@Schema()
export class Event extends Document {
  @Prop({ required: true, unique: true, type: Number })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  organizer: string;

  @Prop({ default: [] })
  participants: Participants[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
