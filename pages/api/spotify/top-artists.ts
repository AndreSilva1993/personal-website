import { getTopArtists } from '@src/clients/spotify/spotify';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_request: NextApiRequest, response: NextApiResponse) {
  response.status(200).json(await getTopArtists());
}
