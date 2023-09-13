import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Subcategory } from "src/models/subcategory.model";
import { Category } from "src/models/category.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
    SequelizeModule.forFeature([Category, Subcategory]),
  ]
})
export class CategoriesModule {}
