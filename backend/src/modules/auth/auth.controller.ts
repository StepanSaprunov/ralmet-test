import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/modules/users/dto/create-user-dto";
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IRegistrationResponse } from "src/types/auth";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: "Login with username and password"
  })
  @ApiResponse({ status: 200, type: IRegistrationResponse })
  @Post('/login')
  async login(@Body() userDTO: CreateUserDto) {
    return this.authService.login(userDTO);
  }

  @ApiOperation({
    summary: "Registration with username and password"
  })
  @ApiResponse({ status: 200, type: IRegistrationResponse })
  @Post('/registration')
  async registration(@Body() userDTO: CreateUserDto) {
    return this.authService.registration(userDTO);
  }
}
