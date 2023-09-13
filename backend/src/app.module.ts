import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./modules/users/users.module";
import { User } from "./models/users.model";
import { AuthModule } from './modules/auth/auth.module';
import { Product } from "./models/product.model";
import { Category } from "./models/category.model";
import { File } from "./models/files.model";
import { ProductField } from "./models/product_fields.model";
import { ProductCategory } from "./models/product-category.model";
import { Subcategory } from "./models/subcategory.model";
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadModels: true,
      models: [
        User,
        Product,
        Category,
        File,
        ProductField,
        ProductCategory,
        Subcategory
      ],
    }),
    UsersModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
  ],
})
export class AppModule {}
