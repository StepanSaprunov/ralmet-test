import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "src/modules/users/dto/create-user-dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() userDTO: CreateUserDTO) {
    return this.authService.login(userDTO);
  }

  @Post('/registration')
  async registration(@Body() userDTO: CreateUserDTO) {
    return this.authService.registration(userDTO);
  }
}
