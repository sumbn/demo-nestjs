import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(data: any): Promise<any> {
    return this.categoryRepository.save(data);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }
}
