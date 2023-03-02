import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';

import { getTopArtists } from '@src/clients/spotify/spotify';

import type { SpotifyTimeRange } from '@src/clients/spotify/spotify.types';

export async function GET(request: NextRequest) {
  const { get } = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const accessToken = (await get<string>(process.env.SPOTIFY_ACCESS_TOKEN_REDIS_KEY!)) || '';

  // NextResponse extends the Web Response API
  return NextResponse.json(
    await getTopArtists(
      accessToken,
      request.nextUrl.searchParams.get('timeRange') as SpotifyTimeRange,
      Number(request.nextUrl.searchParams.get('page')) || 1
    )
  );
}
