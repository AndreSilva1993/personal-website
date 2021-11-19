import { getTopAlbums } from '@src/clients/last-fm/last-fm';
import { LastFMTimePeriod } from '@src/clients/last-fm/last-fm.types';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  response
    .status(200)
    .json(
      await getTopAlbums({
        page: Number(request.query.page),
        period: request.query.period as LastFMTimePeriod,
      })
    );
}
