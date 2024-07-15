import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  create(@Body() body: any) {
    return this.categoryService.create(body);
  }

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }
}
