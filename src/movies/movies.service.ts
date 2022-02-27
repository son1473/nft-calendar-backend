import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie, MovieDocument } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async getAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async getOne(id: string): Promise<Movie> {
    // 타입이 이게 맞나
    const movie = await this.movieModel.findOne({ _id: id }); // await 필요한건가 아닌가.. 아니면 바로 밑에 error 뜰 듯.
    if (!movie) {
      throw new NotFoundException(`Movie with id : ${id}`);
    }
    return movie;
  }

  async deleteOne(id: string): Promise<Movie> {
    const deletedMovie = await this.movieModel.findOneAndDelete({ _id: id }); //id가 다른 것들만 남긴다. 즉 없애는 것
    if (!deletedMovie) {
      throw new NotFoundException(`Couldn't delete the movie, id : ${id}`);
    }
    return deletedMovie;
    // return true;
  }

  async create(movieData: CreateMovieDto): Promise<Movie> {
    const createdMovie = new this.movieModel(movieData);
    return createdMovie.save();
  }

  async update(id: string, updateData: UpdateMovieDto): Promise<Movie> {
    this.getOne(id);
    return this.movieModel.findOneAndUpdate({ _id: id }, { ...updateData });
  }
}

// private movies: Movie[] = [];

// getAll(): Movie[] {
//   return this.movies;
// }

// getOne(id: number): Movie {
//   const movie = this.movies.find((movie) => movie.id === id);
//   if (!movie) {
//     throw new NotFoundException(`Movie with id : ${id}`);
//   }
//   return movie;
// }

// deleteOne(id: number): boolean {
//   this.getOne(id);
//   this.movies = this.movies.filter((movie) => movie.id !== id); //id가 다른 것들만 남긴다. 즉 없애는 것
//   return true;
// }

// create(movieData: CreateMovieDto) {
//   this.movies.push({
//     id: this.movies.length + 1,
//     ...movieData,
//   });
// }

// update(id: number, updateData: UpdateMovieDto) {
//   const movie = this.getOne(id);
//   this.deleteOne(id);
//   this.movies.push({
//     ...movie,
//     ...updateData,
//   });
// }
