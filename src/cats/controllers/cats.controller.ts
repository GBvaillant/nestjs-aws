import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CatsService } from '../services/cats.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
  ) {
    return this.catsService.uploadAndCreateCat(name, file);
  }
}
