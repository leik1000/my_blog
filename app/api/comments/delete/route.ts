import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function DELETE(request: NextRequest) {
  try {
    if (!supabaseServer) {
      return NextResponse.json({ error: 'Supabase 未配置' }, { status: 500 });
    }

    // 检查管理员权限
    const { data: { session }, error: sessionError } = await supabaseServer.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    // TODO: 检查用户是否为管理员
    // const isAdmin = await checkIsAdmin(session.user.id);
    // if (!isAdmin) {
    //   return NextResponse.json({ error: '仅管理员可删除' }, { status: 403 });
    // }

    const { searchParams } = new URL(request.url);
    const comment_id = searchParams.get('id');

    if (!comment_id) {
      return NextResponse.json({ error: '缺少 comment_id' }, { status: 400 });
    }

    // 软删除评论
    const { error } = await supabaseServer
      .from('comments')
      .update({ deleted: true })
      .eq('id', comment_id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('删除评论失败:', error);
    return NextResponse.json({ error: '删除失败' }, { status: 500 });
  }
}
