'use client';

import { useState } from 'react';
import { supabaseClient } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const supabaseReady = Boolean(supabaseClient?.auth);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('密码不匹配');
      return;
    }

    setLoading(true);

    try {
      if (!supabaseReady) {
        throw new Error('Supabase 未配置');
      }

      const client = supabaseClient!;

      // 1. 注册用户
      const { data: signUpData, error: signUpError } = await client.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      // 2. 如果注册返回了 session，说明邮箱验证已禁用，可以直接登录
      if (signUpData.session) {
        console.log('注册成功，自动登录');
        router.push('/tools/image');
        return;
      }

      // 3. 如果没有 session，尝试立即登录
      console.log('注册成功，尝试自动登录');
      const { data: signInData, error: signInError } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.log('自动登录失败（可能需要邮箱验证）:', signInError.message);
        // 如果自动登录失败，重定向到登录页
        router.push('/auth/login?registered=true');
      } else if (signInData.session) {
        console.log('自动登录成功');
        router.push('/tools/image');
      }
    } catch (err: any) {
      setError(err.message || '注册失败');
      setLoading(false);
    }
  };

  if (!supabaseReady) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-md">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-lg border dark:border-slate-700 text-center">
          <p className="text-red-600">Supabase 配置缺失，请稍后再试</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-lg border dark:border-slate-700">
        <h1 className="text-2xl font-bold mb-6 text-center">注册账户</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">确认密码</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:border-blue-600"
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '注册中...' : '注册'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p>已有账户？<Link href="/auth/login" className="text-blue-600 hover:underline">登录</Link></p>
        </div>
      </div>
    </div>
  );
}
