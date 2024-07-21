// src/user/organiser.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async fetchAllUsers() {
    return this.prisma.user.findMany();
  }
}
