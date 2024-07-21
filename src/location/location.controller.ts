// src/event/location.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LocationService } from './location.service';
import { Event } from '@prisma/client';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  // @Post()
  // async createEvent(@Body() eventData: Event): Promise<Event> {
  //   return this.eventService.create(eventData);
  // }

  @Get()
  async getAllEvents() {
    return this.locationService.findAll();
  }
}
