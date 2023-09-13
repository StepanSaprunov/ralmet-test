import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "Vasya", type: String, description: "Username" })
  readonly username: string;

  @ApiProperty({ example: "123456", type: String, description: "Password" })
  readonly password: string;
}
