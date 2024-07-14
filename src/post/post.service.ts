import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/post/dto/create-post.dto';
import { Post } from './entities/post.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create(userId: number, createPostDto: CreatePostDto): Promise<Post> {
    const user = await this.userRepository.findOneBy({ id: userId });
    console.log(user);
    try {
      const res = await this.postRepository.save({ ...createPostDto, user });

      return await this.postRepository.findOneBy({ id: res.id });
    } catch {
      throw new HttpException('cannot create post', HttpStatus.BAD_REQUEST);
    }
  }
}
