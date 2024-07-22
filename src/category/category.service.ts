// src/event/location.service.ts
import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {Event} from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(eventData: Event): Promise<Event> {
    return this.prisma.event.create({
      data: eventData,
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }
}
