import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "src/models/product.model";
import { Category } from "src/models/category.model";
import { ProductField } from "src/models/product_fields.model";
import { Sequelize } from "sequelize-typescript";
import { File } from "src/models/files.model";
import { FilesService } from "../files/files.service";

@Injectable()
export class ProductsService {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly filesService: FilesService,
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(Category) private categoryModel: typeof Category,
    @InjectModel(ProductField) private productFieldModel: typeof ProductField,
    @InjectModel(File) private fileModel: typeof File,
  ) {}

  async create(createProductDto: CreateProductDto, files: any[]) {
    const transaction = await this.sequelize.transaction();

    try {
      const product = await this.productModel.create({
        name: createProductDto.name,
      }, { transaction });

      const fileNames = [];

      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const fileName = await this.filesService.createFile(file, product.id, transaction);
        fileNames.push(fileName);
      }

      if (createProductDto.categories && createProductDto.categories.length > 0) {
        const categories = await this.categoryModel.findAll({
          where: {
            id: createProductDto.categories,
          },
          transaction,
        });
        await product.$set('categories', categories, { transaction });
      }

      if (createProductDto.fields && createProductDto.fields.length > 0) {
        const productFields = createProductDto.fields.map((field) => ({
          productId: product.id,
          name: field.name,
          value: field.value,
        }));
        await this.productFieldModel.bulkCreate(productFields, { transaction });
      }

      await transaction.commit();
      return product;
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      throw new HttpException({ message: "Error while adding product" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    const products = await this.productModel.findAll({
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
          include: [{
            model: Category,
            attributes: ['id', 'name'],
            through: {
              attributes: []
            }
          }],
          through: {
            attributes: []
          }
        },
        {
          model: ProductField,
          attributes: ['name', 'value']
        },
        {
          model: File
        }
      ],
    });
    return products;
  }

  async findOne(id: number) {
    const product = await this.productModel.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
          include: [{
            model: Category,
            attributes: ['id', 'name'],
            through: {
              attributes: []
            }
          }],
          through: {
            attributes: []
          }
        },
        {
          model: ProductField,
          attributes: ['name', 'value']
        }
      ],
    });
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const transaction = await this.productModel.sequelize.transaction();

    try {
      const product = await this.productModel.findByPk(id, {
        include: [Category, ProductField],
        transaction,
      });

      if (!product) {
        await transaction.rollback();
        throw new Error;
      }

      if (updateProductDto.name) {
        product.name = updateProductDto.name;
      }

      if (updateProductDto.categories) {
        const categories = await this.categoryModel.findAll({
          where: {
            id: updateProductDto.categories,
          },
          transaction,
        });
        await product.$set('categories', categories, { transaction });
      }

      if (updateProductDto.fields) {
        await ProductField.destroy({
          where: {
            productId: product.id,
          },
          transaction,
        });

        const productFields = updateProductDto.fields.map((field) => ({
          productId: product.id,
          name: field.name,
          value: field.value,
        }));
        await this.productFieldModel.bulkCreate(productFields, { transaction });
      }

      await product.save({ transaction });

      await transaction.commit();
      const newProduct = await this.productModel.findByPk(id, {
        include: [
          {
            model: Category,
            attributes: ['id', 'name'],
            include: [{
              model: Category,
              attributes: ['id', 'name'],
              through: {
                attributes: []
              }
            }],
            through: {
              attributes: []
            }
          },
          {
            model: ProductField,
            attributes: ['name', 'value']
          }
        ],
      });
      return newProduct;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw new HttpException({ message: "Error while updating product" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    const product = await this.productModel.findByPk(id);

    if (!product) {
      throw new HttpException({ message: "Error while removing product" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    await product.destroy();
  }
}
