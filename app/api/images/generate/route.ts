import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // 移除原有权限校验
    // 为了防止向远程 Supabase 数据库插入缺少 user_id (外键) 的数据报错，
    // 这里将其改为仅仅打印日志并返回模拟成功（因为我们移除了登录且不能改用户远端库结构）。

    // 解析请求体
    const body = await request.json();
    const { prompt, negative_prompt, size, steps } = body;

    // 校验参数
    if (!prompt || typeof prompt !== 'string' || prompt.length > 500) {
      return NextResponse.json({ error: '提示词无效' }, { status: 400 });
    }

    if (steps < 10 || steps > 50) {
      return NextResponse.json({ error: '步数必须在 10-50 之间' }, { status: 400 });
    }

    if (!['512x512', '768x768', '1024x1024'].includes(size)) {
      return NextResponse.json({ error: '尺寸无效' }, { status: 400 });
    }

    // 以前这里调用 Supabase 插入记录，但由于表结构强依赖 auth.users，现在跳过数据库存储。
    console.log('[Mocked Image Job]', { prompt, negative_prompt, size, steps });

    // 模拟生成一个随机短 ID
    const jobId = Math.random().toString(36).substring(2, 10);

    return NextResponse.json({ job_id: jobId, status: 'queued' });
  } catch (error) {
    console.error('API 错误:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
