import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "src/models/product.model";
import { Category } from "src/models/category.model";
import { ProductField } from "src/models/product_fields.model";
import { File } from "src/models/files.model";
import { FilesModule } from "../files/files.module";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    SequelizeModule.forFeature([Product, Category, ProductField, File]),
    FilesModule
  ]
})
export class ProductsModule {}
