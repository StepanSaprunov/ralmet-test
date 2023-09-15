import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "./category.model";
import { ProductCategory } from "./product-category.model";
import { ProductField } from "./product_fields.model";
import { File } from "./files.model";
import { CreateProductDto } from "src/modules/products/dto/create-product.dto";
import { ApiProperty } from "@nestjs/swagger";

@Table({
  tableName: "products",
})
export class Product extends Model<Product, CreateProductDto> {
  @ApiProperty({ example: 1, description: "Product id", type: Number })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Detail", description: "Product name", type: String })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ description: "Product's categories", type: [Category] })
  @BelongsToMany(() => Category, () => ProductCategory)
  categories: Category[];

  @ApiProperty({ description: "Product's custom fields", type: [ProductField] })
  @HasMany(() => ProductField)
  fields: ProductField[];

  @ApiProperty({ type: [File], description: "Product's files" })
  @HasMany(() => File)
  files: File[];
}
