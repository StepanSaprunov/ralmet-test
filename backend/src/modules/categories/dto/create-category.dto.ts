import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({ example: "Table", type: String, description: "Category name" })
  readonly name: string;
  @ApiProperty({ example: [1, 2, 3], type: [Number], description: "Subcategories id" })
  readonly subcategories?: number[];
}
