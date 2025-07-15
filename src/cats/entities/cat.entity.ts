import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Cat extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;
}

export const CatSchema = SchemaFactory.createForClass(File);
