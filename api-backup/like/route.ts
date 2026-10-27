import { NextRequest, NextResponse } from 'next/server';
import { toggleLike, getLikeStatus, getProjectLikeCount } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uuid, projectId } = body;

    if (!uuid || !projectId) {
      return NextResponse.json({ success: false, error: 'Missing uuid or projectId' }, { status: 400 });
    }

    const result = toggleLike(uuid, projectId);

    return NextResponse.json({
      success: true,
      liked: result.liked,
      count: result.count
    });
  } catch (error) {
    console.error('Like API error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const uuid = searchParams.get('uuid');
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json({ success: false, error: 'Missing projectId' }, { status: 400 });
    }

    if (uuid) {
      const status = getLikeStatus(uuid, projectId);
      return NextResponse.json({ success: true, ...status });
    }

    const count = getProjectLikeCount(projectId);
    return NextResponse.json({ success: true, liked: false, count });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
