import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE || '';

// 浏览器客户端（前端/客户端组件使用）
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// 服务端客户端（API Route 使用 - 仅在服务端导入）
let supabaseServerInstance: any = null;

export function getSupabaseServer() {
  if (typeof window !== 'undefined') {
    throw new Error('getSupabaseServer() should only be called on the server side');
  }
  if (!supabaseServerInstance) {
    supabaseServerInstance = createClient(supabaseUrl, supabaseServiceRole, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      db: { schema: 'public' },
    });
  }
  return supabaseServerInstance;
}

// 服务端客户端 - 仅在服务端使用，使用 getter 实现真正的懒加载
let _supabaseServer: any = null;

export function getSupabaseServerClient() {
  if (typeof window !== 'undefined') {
    throw new Error('getSupabaseServerClient() should only be called on the server side');
  }
  if (!_supabaseServer) {
    if (!supabaseUrl || !supabaseServiceRole) {
      console.warn('Supabase credentials are missing');
      return null;
    }
    _supabaseServer = createClient(supabaseUrl, supabaseServiceRole, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      db: { schema: 'public' },
    });
  }
  return _supabaseServer;
}

// 导出 getter，为了向后兼容保留原有的名称
export const supabaseServer = (() => {
  if (typeof window === 'undefined') {
    return getSupabaseServerClient();
  }
  return null;
})();

export type Database = any; // 可扩展为具体类型
