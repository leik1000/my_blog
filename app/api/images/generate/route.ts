import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // 获取认证用户（使用 Cookie 中的 token）
    const { data: { session }, error: sessionError } = await supabaseServer.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    const user = session.user;

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

    // 创建任务记录
    const { data: job, error: insertError } = await supabaseServer
      .from('image_jobs')
      .insert({
        user_id: user.id,
        prompt,
        negative_prompt: negative_prompt || null,
        size,
        steps,
        status: 'queued',
      })
      .select()
      .single();

    if (insertError) {
      console.error('插入任务失败:', insertError);
      return NextResponse.json({ error: '创建任务失败' }, { status: 500 });
    }

    // TODO: 异步调用 ComfyUI API 并更新状态
    // 这里先返回已提交状态

    return NextResponse.json({ job_id: job.id, status: 'queued' });
  } catch (error) {
    console.error('API 错误:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
