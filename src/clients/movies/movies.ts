import fs from 'fs';

export const getMovies = () => {
  return JSON.parse(fs.readFileSync(`${process.cwd()}/public/movies.json`, 'utf8'));
};
