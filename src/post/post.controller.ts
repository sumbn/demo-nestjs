import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePostDto } from 'src/post/dto/create-post.dto';
import { PostService } from 'src/post/post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: storageConfig('post'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowExtArr = ['.jpg', '.png', '.jpeg'];
        if (!allowExtArr.includes(ext)) {
          req.fileValidationError = `wrong extension file. Accept file ext are: ${allowExtArr.toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            req.fileValidationError =
              'file size is  too lager. Accept file size is less than 5mb';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  create(
    @Req() req: any,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // console.log(req['user_data']);
    // console.log(createPostDto);
    // console.log(file);

    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('file is requied');
    }

    return this.postService.create(req['user_data'].id, {
      ...createPostDto,
      thumbnail: file.destination + '/' + file.filename,
    });
  }
}
