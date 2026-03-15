import { NextResponse } from 'next/server';
import { entitiesDatas, data } from '@/public/data';

export async function GET() {
  return NextResponse.json({
    entities: entitiesDatas,
    metrics: data,
  });
}
