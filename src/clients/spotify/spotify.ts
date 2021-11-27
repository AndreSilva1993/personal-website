import axios from 'axios';
import cookie from 'cookie';

import type {
  SpotifyTopArtist,
  SpotifyTopArtistsResponse,
} from '@src/clients/spotify/spotify.types';
import type { NextApiRequest, NextApiResponse } from 'next';

const spotifyAPIClient = axios.create({ baseURL: process.env.SPOTIFY_API_URL });
const spotifyAccountAPIClient = axios.create({ baseURL: process.env.SPOTIFY_ACCOUNTS_API_URL });

const obtainNewAccessToken = async () => {
  const requestParams = new URLSearchParams();
  requestParams.append('grant_type', 'refresh_token');
  requestParams.append('refresh_token', process.env.SPOTIFY_REFRESH_TOKEN);

  const clientIdAndSecret = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');

  const { data } = await spotifyAccountAPIClient.post('/api/token', requestParams, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${clientIdAndSecret}`,
    },
  });

  return data.access_token;
};

spotifyAPIClient.interceptors.response.use(null, async ({ config, response }) => {
  if (response.status === 401) {
    const accessToken = await obtainNewAccessToken();

    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${accessToken}`;
    return axios.request(config);
  }

  return null;
});

export const getTopArtists = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<SpotifyTopArtist[]> => {
  const { data: topArtists, config } = await spotifyAPIClient.get<SpotifyTopArtistsResponse>(
    '/me/top/artists',
    {
      params: { time_range: 'long_term' },
      headers: {
        Authorization: `Bearer ${request.cookies[process.env.SPOTIFY_ACCESS_TOKEN_COOKIE]}`,
      },
    }
  );

  // Make sure the cookie always contains a valid access token.
  response.setHeader(
    'Set-Cookie',
    cookie.serialize(
      process.env.SPOTIFY_ACCESS_TOKEN_COOKIE,
      config.headers.Authorization.split(' ')[1],
      {
        path: '/',
        httpOnly: true,
      }
    )
  );

  return topArtists.items.map(({ name, images }) => ({
    name,
    image: images.sort((a, b) => b.height - a.height)[1].url,
  }));
};
