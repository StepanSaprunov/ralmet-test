import { BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";
import { ProductCategory } from "./product-category.model";
import { Subcategory } from "./subcategory.model";

interface CategoryCreationAttr {
  name: string;
  categories?: [string];
}

@Table({
  tableName: "products",
})
export class Category extends Model<Category, CategoryCreationAttr> {
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

  @BelongsToMany(() => Product, () => ProductCategory)
  products: Product[]

  @BelongsToMany(() => Category, () => Subcategory)
  subcategories: Category[]
}
