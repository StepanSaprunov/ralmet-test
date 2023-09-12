import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "src/strategy";
import { UsersModule } from "../users/users.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET_KEY',
      signOptions: {
        expiresIn: '12h'
      }
    })
  ]
})
export class AuthModule {}
