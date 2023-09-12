import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../../models/users.model";
import { CreateUserDTO } from "./dto/create-user-dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDTO) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username
      }
    });
    return user;
  }
}
