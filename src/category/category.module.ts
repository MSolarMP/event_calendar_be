// src/event/location.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from "../../prisma/prisma.module";
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [PrismaModule], // Import PrismaModule if you haven't already
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
