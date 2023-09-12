import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "./category.model";
import { ProductCategory } from "./product-category.model";
import { ProductField } from "./product_fields.model";

interface ProductCreationAttr {
  name: string;
  categories?: [string];
}

@Table({
  tableName: "products",
})
export class Product extends Model<Product, ProductCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Category, () => ProductCategory)
  categories: Category[]

  @HasMany(() => ProductField)
  fields: ProductField[]
}
