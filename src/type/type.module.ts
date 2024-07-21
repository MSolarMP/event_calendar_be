// src/event/location.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from "../../prisma/prisma.module";
import { TypeController } from './type.controller';
import { TypeService } from './type.service';

@Module({
  imports: [PrismaModule], // Import PrismaModule if you haven't already
  controllers: [TypeController],
  providers: [TypeService],
})
export class TypeModule {}
