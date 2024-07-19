// src/event/event.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from "../../prisma/prisma.module";
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [PrismaModule], // Import PrismaModule if you haven't already
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
