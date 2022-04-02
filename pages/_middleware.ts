import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export async function middleware({ page }: NextRequest) {
  const { exists, set, expire } = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  if (page.name && (page.name === '/music' || page.name.startsWith('/api/spotify'))) {
    const accessTokenExists = await exists(process.env.SPOTIFY_ACCESS_TOKEN_REDIS_KEY);

    if (!accessTokenExists) {
      const clientIdAndSecret = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString('base64');

      const spotifyResponse = await fetch(`${process.env.SPOTIFY_ACCOUNTS_API_URL}/api/token`, {
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${clientIdAndSecret}`,
        },
      });

      const { access_token: accessToken, expires_in: expiresIn } = await spotifyResponse.json();

      await set(process.env.SPOTIFY_ACCESS_TOKEN_REDIS_KEY, accessToken);
      await expire(process.env.SPOTIFY_ACCESS_TOKEN_REDIS_KEY, expiresIn);
    }
  }

  return NextResponse.next();
}
