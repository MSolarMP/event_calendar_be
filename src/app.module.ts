// src/app.module.ts
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { PrismaModule } from "../prisma/prisma.module";
import {TypeModule} from "./type/type.module";
import {LocationModule} from "./location/location.module";
import {OrganiserModule} from "./organiser/organiser.module";

@Module({
  imports: [
    UserModule,
    EventModule,
    PrismaModule,
    TypeModule,
    LocationModule,
    OrganiserModule
  ],
})
export class AppModule {}
