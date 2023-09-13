import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";
import { ApiProperty } from "@nestjs/swagger";

@Table({
  tableName: "product_fields",
})
export class ProductField extends Model<ProductField> {
  @ApiProperty({ example: 1, description: "Product's id", type: Number })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  productId: number;

  @ApiProperty({ example: "Mass", description: "Product's field name", type: String })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name: string;

  @ApiProperty({ example: "20 kg", description: "Product's field value", type: String })
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  value: string;

  @ApiProperty({ description: "Product", type: Product })
  @BelongsTo(() => Product)
  product: Product;
}
