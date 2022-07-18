export interface Movie {
  title: string;
  image: string;
  imagePlaceholder: string;
  year: number;
  genres: string[];
  imdbIdentifier: string;
}

export interface MoviesData {
  movies: Movie[];
  genres: string[];
  moviesPerGenre: Record<string, number>;
}