import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { IQueryPagination } from "src/types/query";
import { JwtAuthGuard } from "src/guards/jwt-guard";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Category } from "src/models/category.model";

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({
    summary: "Create category"
  })
  @ApiResponse({ status: 200, type: Category })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({
    summary: "Get all categories"
  })
  @ApiResponse({ status: 200, type: [Category] })
  @Get()
  findAll(@Query() query: IQueryPagination) {
    return this.categoriesService.findAll(query);
  }

  @ApiOperation({
    summary: "Get category by id"
  })
  @ApiResponse({ status: 200, type: Category })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @ApiOperation({
    summary: "Update category by id"
  })
  @ApiResponse({ status: 200, type: Category })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @ApiOperation({
    summary: "Delete category"
  })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
