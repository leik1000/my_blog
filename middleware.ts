import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // 中间件暂时不做认证检查
  // 认证在客户端组件中通过 Supabase 的 getSession() 进行检查
  return NextResponse.next();
}

export const config = {
  matcher: ['/tools/:path*'],
};
