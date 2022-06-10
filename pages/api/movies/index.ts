import type { NextApiRequest, NextApiResponse } from 'next';

import { getMovies } from '@src/clients/movies/movies';

export default async function handler(_: NextApiRequest, response: NextApiResponse) {
  response.status(200).json(getMovies());
}
