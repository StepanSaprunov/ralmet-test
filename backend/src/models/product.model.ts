import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "./category.model";
import { ProductCategory } from "./product-category.model";
import { ProductField } from "./product_fields.model";
import { File } from "./files.model";
import { CreateProductDto } from "src/modules/products/dto/create-product.dto";

@Table({
  tableName: "products",
})
export class Product extends Model<Product, CreateProductDto> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Category, () => ProductCategory)
  categories: Category[];

  @HasMany(() => ProductField)
  fields: ProductField[];

  @HasMany(() => File)
  files: File;
}
