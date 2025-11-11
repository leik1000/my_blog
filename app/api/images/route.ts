import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    if (!supabaseServer) {
      return NextResponse.json({ error: 'Supabase 未配置' }, { status: 500 });
    }

    // 获取认证用户
    const { data: { session }, error: sessionError } = await supabaseServer.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const user = session.user;

    // 查询用户的生图任务（最近 20 条）
    const { data: jobs, error } = await supabaseServer
      .from('image_jobs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('查询失败:', error);
      return NextResponse.json({ error: '查询失败' }, { status: 500 });
    }

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('API 错误:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
