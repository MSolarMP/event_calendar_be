// src/event/location.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TypeService } from './type.service';
import { Event } from '@prisma/client';

@Controller('types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  // @Post()
  // async createEvent(@Body() eventData: Event): Promise<Event> {
  //   return this.eventService.create(eventData);
  // }

  @Get()
  async getAllEvents() {
    return this.typeService.findAll();
  }
}
