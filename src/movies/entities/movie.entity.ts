/* eslint-disable prettier/prettier */
// database의 모델을 만들어 주어야 한다.
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop()
  year: number;

  @Prop()
  genres: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
