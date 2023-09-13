import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({ example: "Pen", type: String, description: "Product name" })
  readonly name: string;

  @ApiProperty({ example: [1, 2, 3], type: [Number], description: "Categories id" })
  readonly categories?: number[];

  @ApiProperty({ example: { name: "Length", value: "20 cm" }, description: "Custom product fields" })
  readonly fields?: {
    name: string;
    value: string;
  }[];

  @ApiProperty({ description: "Files" })
  readonly files?: any[];
}
