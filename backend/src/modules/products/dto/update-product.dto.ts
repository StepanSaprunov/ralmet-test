import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { File } from "src/models/files.model";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto extends PartialType(CreateProductDto) {
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

  readonly filesToRemove?: File[];
}
