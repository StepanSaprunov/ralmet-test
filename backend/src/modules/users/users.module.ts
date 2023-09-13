import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../../models/users.model";

@Module({
  controllers: [],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User])],
  exports: [UsersService]
})
export class UsersModule {}
