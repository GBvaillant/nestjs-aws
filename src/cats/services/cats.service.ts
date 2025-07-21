import { S3Service } from './../../aws/s3.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from '../entities/cat.entity';
import { Model } from 'mongoose';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name) private catModel: Model<Cat>,
    private readonly S3Service: S3Service,
  ) {}

  async uploadAndCreateCat(
    name: string,
    file: Express.Multer.File,
  ): Promise<Cat> {
    const key = `${Date.now()}-${file.originalname}`;

    await this.S3Service.uploadFile('http-cats', key, file.buffer);
    const url = `http://localhost:4566/http-cats/${key}`;

    const newCat = new this.catModel({
      name,
      url,
    });
    return newCat.save();
  }
}
