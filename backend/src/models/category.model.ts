import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";
import { ProductCategory } from "./product-category.model";
import { Subcategory } from "./subcategory.model";
import { CreateCategoryDto } from "src/modules/categories/dto/create-category.dto";
import { ApiProperty } from "@nestjs/swagger";

@Table({
  tableName: "categories",
})
export class Category extends Model<Category, CreateCategoryDto> {
  @ApiProperty({ example: 1, type: Number, description: "Category id" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Table", type: String, description: "Category name" })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ type: [Product], description: "Products" })
  @BelongsToMany(() => Product, () => ProductCategory)
  products: Product[]

  @ApiProperty({ type: [Category], description: "Subcategories" })
  @BelongsToMany(() => Category, () => Subcategory, 'categoryId', 'subcategoryId')
  subcategories: Category[]
}
