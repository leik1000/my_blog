'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase';

export default function ImageToolPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [size, setSize] = useState('512x512');
  const [steps, setSteps] = useState(20);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<any[]>([]);

  const checkAuth = useCallback(async () => {
    try {
      const { data: { session }, error } = await supabaseClient.auth.getSession();
      
      if (error) {
        console.error('获取 session 失败:', error);
        router.push('/auth/login');
        return;
      }
      
      if (!session) {
        console.log('无 session，重定向到登录页');
        router.push('/auth/login');
        return;
      }
      
      console.log('已获取 session，用户:', session.user.email);
      setUser(session.user);
      loadHistory();
    } catch (err) {
      console.error('checkAuth 错误:', err);
      router.push('/auth/login');
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const loadHistory = async () => {
    try {
      const { data } = await supabaseClient
        .from('image_jobs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (data) {
        setHistory(data);
      }
    } catch (err) {
      console.error('加载历史失败:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (!prompt.trim()) {
        setError('请输入提示词');
        setLoading(false);
        return;
      }

      if (prompt.length > 500) {
        setError('提示词不超过 500 字符');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/images/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          negative_prompt: negativePrompt,
          size,
          steps,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || '提交失败');
      } else {
        setMessage(`✓ 已提交 (任务ID: ${data.job_id?.substring(0, 8)}...)`);
        setPrompt('');
        setNegativePrompt('');
        // 1 秒后重新加载历史
        setTimeout(() => loadHistory(), 1000);
      }
    } catch (err: any) {
      setError(err.message || '提交失败');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="container mx-auto px-4 py-12">加载中...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">AI 生图工具</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 表单 */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-lg border dark:border-slate-700">
            <div>
              <label className="block text-sm font-medium mb-2">提示词 *</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:border-blue-600"
                rows={4}
                placeholder="描述你想要生成的图片..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">负面词（可选）</label>
              <textarea
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:border-blue-600"
                rows={2}
                placeholder="描述你不想要的元素..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">尺寸</label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700"
                >
                  <option value="512x512">512x512</option>
                  <option value="768x768">768x768</option>
                  <option value="1024x1024">1024x1024</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">步数 ({steps})</label>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={steps}
                  onChange={(e) => setSteps(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {error && <div className="text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded">{error}</div>}
            {message && <div className="text-green-600 text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded">{message}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? '提交中...' : '生成图片'}
            </button>
          </form>
        </div>

        {/* 历史 */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border dark:border-slate-700">
          <h3 className="font-bold mb-4">生成历史</h3>
          {history.length === 0 ? (
            <p className="text-sm text-slate-600 dark:text-slate-400">暂无历史记录</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {history.map(job => (
                <div key={job.id} className="text-xs border rounded p-2 dark:border-slate-700">
                  <p className="font-medium truncate">{job.prompt.substring(0, 40)}...</p>
                  <p className="text-slate-600 dark:text-slate-400">
                    {job.status === 'succeeded' ? '✓ 完成' : job.status === 'failed' ? '✗ 失败' : '⏳ 处理中'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
