// src/event/location.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Event } from '@prisma/client';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // @Post()
  // async createEvent(@Body() eventData: Event): Promise<Event> {
  //   return this.eventService.create(eventData);
  // }

  @Get()
  async getAllEvents() {
    return this.categoryService.findAll();
  }
}
