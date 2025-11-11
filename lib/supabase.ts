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

// 直接导出，API Route 中使用 - 懒加载防止服务端错误
export let supabaseServer: any = null;

if (typeof window === 'undefined' && !supabaseServer) {
  try {
    supabaseServer = createClient(supabaseUrl, supabaseServiceRole, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      db: { schema: 'public' },
    });
  } catch (err) {
    console.error('Failed to create Supabase server client:', err);
  }
}

export type Database = any; // 可扩展为具体类型
