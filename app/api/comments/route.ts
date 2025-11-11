import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    if (!supabaseServer) {
      return NextResponse.json({ error: 'Supabase 未配置' }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const post_slug = searchParams.get('post_slug');

    if (!post_slug) {
      return NextResponse.json({ error: '缺少 post_slug 参数' }, { status: 400 });
    }

    // 查询该文章的评论（仅非删除）
    const { data: comments, error } = await supabaseServer
      .from('comments')
      .select('id, author_name, content, created_at')
      .eq('post_slug', post_slug)
      .eq('deleted', false)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({ comments });
  } catch (error) {
    console.error('查询评论失败:', error);
    return NextResponse.json({ error: '查询失败' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!supabaseServer) {
      return NextResponse.json({ error: 'Supabase 未配置' }, { status: 500 });
    }

    const body = await request.json();
    const { post_slug, author_name, author_email, content } = body;

    // 校验
    if (!post_slug || !content) {
      return NextResponse.json({ error: '缺少必填字段' }, { status: 400 });
    }

    if (content.length < 1 || content.length > 1000) {
      return NextResponse.json({ error: '内容长度 1-1000 字符' }, { status: 400 });
    }

    if (author_name && author_name.length > 40) {
      return NextResponse.json({ error: '昵称过长' }, { status: 400 });
    }

    // 插入评论
    const { data: comment, error } = await supabaseServer
      .from('comments')
      .insert({
        post_slug,
        author_name: author_name || null,
        author_email: author_email || null,
        content,
        deleted: false,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.error('提交评论失败:', error);
    return NextResponse.json({ error: '提交失败' }, { status: 500 });
  }
}
