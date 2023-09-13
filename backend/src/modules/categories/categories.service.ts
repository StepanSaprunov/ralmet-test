import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from "src/models/category.model";
import { Subcategory } from "src/models/subcategory.model";
import { Sequelize } from "sequelize-typescript";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class CategoriesService {
  constructor(
    private readonly sequelize: Sequelize,
    @InjectModel(Category) private readonly categoryModel: typeof Category,
    @InjectModel(Subcategory) private readonly subcategoryModel: typeof Subcategory
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const t = await this.sequelize.transaction();

    try {
      const category = await Category.create({
        name: createCategoryDto.name,
      }, { transaction: t });

      if (createCategoryDto.subcategories && createCategoryDto.subcategories.length > 0) {
        await Promise.all(
          createCategoryDto.subcategories.map(
            async (subcategoryId) => {
              const subcategory = await Subcategory.create({
                categoryId: category.id,
                subcategoryId: subcategoryId,
              }, { transaction: t });
              return subcategory;
            }
          )
        );
      }
      await t.commit();

      return category;
    } catch (error) {
      await t.rollback();
      console.log(error);
      throw new HttpException({ message: "Error while adding category" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    const categories = await Category.findAll({
      include: {
        model: Category,
        attributes: ['id', 'name'],
        through: {
          attributes: []
        }
      },
    })
    return categories;
  }

  async findOne(id: number) {
    const category = await Category.findByPk(id, {
      include: {
        model: Category,
        attributes: ['id', 'name'],
        through: {
          attributes: []
        }
      },
    })
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findByPk(id);

    if (!category) {
      throw new HttpException({ message: "Error while updating category" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if (updateCategoryDto.name) {
      category.name = updateCategoryDto.name;
    }
    if (updateCategoryDto.subcategories) {
      await category.$set('subcategories', updateCategoryDto.subcategories);
    }
    await category.save();

    return category;
  }

  async remove(id: number) {
    const category = await this.categoryModel.findByPk(id);

    if (!category) {
      throw new HttpException({ message: "Error while removing category" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    await category.destroy();
  }
}
