import { NextResponse } from 'next/server';

import { getRecentTracks } from '@src/clients/last-fm/last-fm';

export async function GET() {
  return NextResponse.json(await getRecentTracks());
}
