// src/event/location.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from "../../prisma/prisma.module";
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [PrismaModule], // Import PrismaModule if you haven't already
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
