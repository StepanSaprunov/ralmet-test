import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";
import { Category } from "./category.model";

@Table({
  tableName: "products_categories",
  createdAt: false,
  updatedAt: false
})
export class ProductCategory extends Model<ProductCategory> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  productId: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  categoryId: number;
}
