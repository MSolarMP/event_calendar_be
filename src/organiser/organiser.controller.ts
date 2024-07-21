// src/user/organiser.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { OrganiserService } from './organiser.service';

@Controller('organisers')
export class OrganiserController {
  constructor(private readonly organiserService: OrganiserService) {}

  @Get()
  async fetchAllOrganisers() {
    return this.organiserService.fetchAllOrganisers();
  }
}
