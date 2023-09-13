import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/guards/jwt-guard";

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll() {
    return this.usersService.getUsers();
  }
}
