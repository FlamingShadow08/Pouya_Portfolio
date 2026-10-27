import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateVisitor, recordPageView, getTotalStats } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { uuid } = body;

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    const userAgent = req.headers.get('user-agent') || 'unknown';

    if (!uuid) {
      uuid = uuidv4();
    }

    const visitor = getOrCreateVisitor(uuid, ip, userAgent);
    recordPageView(uuid, ip, userAgent);

    const stats = getTotalStats();

    return NextResponse.json({
      success: true,
      uuid: visitor.uuid,
      visitCount: visitor.visit_count,
      stats
    });
  } catch (error) {
    console.error('Visit API error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const stats = getTotalStats();
    return NextResponse.json({ success: true, stats });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
