import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";
import { Category } from "./category.model";

@Table({
  tableName: "subcategories",
  createdAt: false,
  updatedAt: false
})
export class Subcategory extends Model<Subcategory> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  categoryId: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  subcategoryId: number;
}
