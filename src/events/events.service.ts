import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateEventDto } from './create-event.dto';
import { SequenceService } from 'src/counter/sequence.service';
import { CreateParticipantDto } from './create-participant.dto';
import { Event } from './event.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    private readonly sequenceService: SequenceService,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const autoIncrementedId =
      await this.sequenceService.getNextSequenceValue('events');
    const createdEvent = new this.eventModel({
      ...createEventDto,
      id: autoIncrementedId,
    });
    return createdEvent.save();
  }

  async paginate(
    page: string,
    limit: string,
  ): Promise<{ events: Event[]; total: number }> {
    const limitNumber = parseInt(limit, 10);
    const pageNumber = parseInt(page, 10);

    const skip = (pageNumber - 1) * limitNumber;
    console.log(
      `Page Number: ${pageNumber}, Limit: ${limitNumber}, Skip: ${skip}`,
    );

    const total = await this.eventModel.countDocuments().exec();
    const events = await this.eventModel
      .find()
      .skip(skip)
      .limit(limitNumber)
      .exec();
    return {
      events,
      total,
    };
  }

  async getParticipants(eventId: number): Promise<Event['participants']> {
    const event = await this.eventModel
      .findOne({ id: eventId })
      .populate('participants')
      .exec();
    return event.participants;
  }
  async addParticipant(
    eventId: number,
    participant: CreateParticipantDto,
  ): Promise<Event> {
    const event = await this.eventModel
      .findOneAndUpdate(
        { id: eventId },
        { $push: { participants: participant } },
        { new: true },
      )
      .exec();
    return event;
  }
}
