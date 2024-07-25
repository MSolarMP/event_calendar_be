// src/event/event.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../prisma/prisma.service";
import { Event, Prisma } from '@prisma/client';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(eventData: Event): Promise<Event> {
    return this.prisma.event.create({
      data: eventData,
    });
  }

  async findAll() {
    return this.prisma.event.findMany({
      orderBy: [
        { id: 'asc' }
      ],
      include: {
        organiser: true,
        Location: true,
        eventType: true
      }
    });
  }

  async findOne(id: number) {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }

  async update(id: number, eventData: Partial<Event>) {
    return this.prisma.event.update({
      where: { id },
      data: eventData,
    });
  }

  async delete(id: number) {
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
