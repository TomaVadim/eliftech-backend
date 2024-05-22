import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { EventSchema } from './event.schema';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Counter, CounterSchema } from 'src/counter/counter.schema';
import { SequenceService } from 'src/counter/sequence.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema }]),
  ],
  providers: [EventsService, SequenceService],
  controllers: [EventsController],
})
export class EventsModule {}
