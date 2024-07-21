// src/user/organiser.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from "../../prisma/prisma.module";
import { OrganiserController } from './organiser.controller';
import { OrganiserService } from './organiser.service';

@Module({
  imports: [PrismaModule],
  controllers: [OrganiserController],
  providers: [OrganiserService],
})
export class OrganiserModule {}
