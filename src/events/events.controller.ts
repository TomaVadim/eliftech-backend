import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';

import { EventsService } from './events.service';
import { CreateEventDto } from './create-event.dto';
import { CreateParticipantDto } from './create-participant.dto';
import { Event } from './event.schema';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findEventById(@Query('eventId') eventId: string): Promise<Event> {
    return this.eventsService.findEventById(parseInt(eventId));
  }

  @Post()
  create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(createEventDto);
  }

  @Put('new-participant')
  addParticipant(
    @Query('eventId') eventId: string,
    @Body() participant: CreateParticipantDto,
  ) {
    return this.eventsService.addParticipant(parseInt(eventId), participant);
  }

  @Get('participants')
  getParticipants(
    @Query('eventId') eventId: string,
  ): Promise<Event['participants']> {
    return this.eventsService.getParticipants(parseInt(eventId));
  }

  @Get('paginate')
  async findPaginated(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<{ events: Event[]; total: number }> {
    return this.eventsService.paginate(page, limit);
  }
}
