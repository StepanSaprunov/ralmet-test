import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";
import { ApiProperty } from "@nestjs/swagger";

interface FileCreationAttr {
  name: string;
  originalName: string;
  productId: number;
}

@Table({
  tableName: "files",
})
export class File extends Model<File, FileCreationAttr> {
  @ApiProperty({ example: 1, type: Number, description: "File id" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "4e28508d-61eb-4da5-8f1c-e9f66bdc5368.yml", type: String, description: "File name" })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: "docker-compose.yml", type: String, description: "Original file name" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  originalName: string;

  @ApiProperty({ example: 1, type: Number, description: "Product id" })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  @ApiProperty({ type: Product, description: "Product" })
  @BelongsTo(() => Product)
  products: Product
}
