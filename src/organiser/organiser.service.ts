// src/user/organiser.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class OrganiserService {
  constructor(private readonly prisma: PrismaService) {}

  async fetchAllOrganisers() {
    return this.prisma.organiser.findMany();
  }
}
