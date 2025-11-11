import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!supabaseServer) {
      return NextResponse.json({ error: 'Supabase 未配置' }, { status: 500 });
    }

    const { id } = await params;

    // 查询任务状态
    const { data: job, error } = await supabaseServer
      .from('image_jobs')
      .select('id, status, result_url, duration_ms, created_at')
      .eq('id', id)
      .single();

    if (error) {
      console.error('查询失败:', error);
      return NextResponse.json({ error: '查询失败' }, { status: 404 });
    }

    return NextResponse.json({ job });
  } catch (error) {
    console.error('API 错误:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!supabaseServer) {
      return NextResponse.json({ error: 'Supabase 未配置' }, { status: 500 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, result_url, duration_ms } = body;

    // 检查管理员权限（暂不实现）
    // TODO: 检查用户是否为管理员

    // 更新任务状态
    const { data: job, error } = await supabaseServer
      .from('image_jobs')
      .update({
        status,
        result_url,
        duration_ms,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('更新失败:', error);
      return NextResponse.json({ error: '更新失败' }, { status: 500 });
    }

    return NextResponse.json({ job });
  } catch (error) {
    console.error('API 错误:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
