import { Redis } from '@upstash/redis';

import { getTopArtists } from '@src/clients/spotify/spotify';

import type { NextApiRequest, NextApiResponse } from 'next';
import { SpotifyTimeRange } from '@src/clients/spotify/spotify.types';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { get } = Redis.fromEnv();
  const accessToken = await get<string>(process.env.SPOTIFY_ACCESS_TOKEN_REDIS_KEY);

  response
    .status(200)
    .json(
      await getTopArtists(
        accessToken,
        request.query.timeRange as SpotifyTimeRange,
        Number(request.query.page) || 1
      )
    );
}
