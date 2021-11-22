import { getUserInfo } from '@src/clients/last-fm/last-fm';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_request: NextApiRequest, response: NextApiResponse) {
  response.status(200).json(await getUserInfo());
}
