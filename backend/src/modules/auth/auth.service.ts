import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/modules/users/dto/create-user-dto";
import * as bcrypt from "bcryptjs";
import { User } from "src/models/users.model";
import { UsersService } from "../users/users.service";


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDTO: CreateUserDto) {
    const user = await this.validateUser(userDTO);
    return await this.generateToken(user);
  }

  async registration(userDTO: CreateUserDto) {
    const candidate = await this.usersService.getUserByUsername(userDTO.username);
    if (candidate) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    };
    const hashedPassword = await bcrypt.hash(userDTO.password, 7);
    const user = await this.usersService.createUser({ ...userDTO, password: hashedPassword });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
    };
    return {
      token: this.jwtService.sign(payload)
    };
  }

  private async validateUser(userDTO: CreateUserDto) {
    const user = await this.usersService.getUserByUsername(userDTO.username);
    const isPasswordsEqual = await bcrypt.compare(userDTO.password, user.password);
    if (user && isPasswordsEqual) {
      return user;
    };
    throw new UnauthorizedException({ message: "Incorrect username or password" });
  }
}
