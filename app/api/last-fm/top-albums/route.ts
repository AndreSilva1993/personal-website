import { NextRequest, NextResponse } from 'next/server';

import { getTopAlbums } from '@src/clients/last-fm/last-fm';
import { LastFMTimePeriod } from '@src/clients/last-fm/last-fm.types';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    await getTopAlbums(
      Number(request.nextUrl.searchParams.get('page')),
      request.nextUrl.searchParams.get('period') as LastFMTimePeriod
    )
  );
}
