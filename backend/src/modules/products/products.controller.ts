import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from "@nestjs/platform-express";
import { IQueryPagination } from "src/types/query";
import { JwtAuthGuard } from "src/guards/jwt-guard";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: "Create product"
  })
  @ApiResponse({ status: 200 })
  @UseInterceptors(FilesInterceptor('files'))
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: any
  ) {
    return this.productsService.create(createProductDto, files);
  }

  @ApiOperation({
    summary: "Get all products"
  })
  @ApiResponse({ status: 200, })
  @Get()
  findAll(@Query() query: IQueryPagination) {
    return this.productsService.findAll(query);
  }

  @ApiOperation({
    summary: "Get product by id"
  })
  @ApiResponse({ status: 200 })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @ApiOperation({
    summary: "Update product by id"
  })
  @ApiResponse({ status: 200 })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @ApiOperation({
    summary: "Delete product"
  })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
