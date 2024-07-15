import { IsNotEmpty } from 'class-validator';
import { User } from '../../user/entities/user.entity';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  thumbnail: string;

  status: number;

  user: User;
}
