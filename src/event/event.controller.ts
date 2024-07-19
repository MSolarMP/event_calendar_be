// src/event/event.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EventService } from './event.service';
import { Event } from '@prisma/client';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(@Body() eventData: Event): Promise<Event> {
    return this.eventService.create(eventData);
  }

  @Get()
  async getAllEvents() {
    return this.eventService.findAll();
  }

  @Get(':id')
  async getEventById(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Put(':id')
  async updateEvent(@Param('id') id: string, @Body() eventData: Partial<Event>) {
    return this.eventService.update(+id, eventData);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string) {
    return this.eventService.delete(+id);
  }
}
