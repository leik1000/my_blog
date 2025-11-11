import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE;

// 浏览器客户端（前端/客户端组件使用）
export const supabaseClient = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : ({} as any);

// 服务端客户端 - 仅在服务端使用，懒加载
let _supabaseServer: any = null;

export const supabaseServer = supabaseUrl && supabaseServiceRole
  ? (() => {
      if (!_supabaseServer) {
        _supabaseServer = createClient(supabaseUrl, supabaseServiceRole, {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
          db: { schema: 'public' },
        });
      }
      return _supabaseServer;
    })()
  : ({} as any);

export type Database = any; // 可扩展为具体类型
