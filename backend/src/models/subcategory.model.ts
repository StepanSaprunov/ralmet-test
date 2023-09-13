import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Category } from "./category.model";

@Table({
  tableName: "subcategories",
  createdAt: false,
  updatedAt: false
})
export class Subcategory extends Model<Subcategory> {
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
