import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // 因为移除了用户登录认证和依赖它的数据库查询，
    // 这里直接返回空列表以作占位或缓存。
    return NextResponse.json({ jobs: [] });
  } catch (error) {
    console.error('API 错误:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
