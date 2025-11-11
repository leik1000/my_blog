'use client';

import { useState } from 'react';

interface CommentFormProps {
  post_slug: string;
  onSuccess?: () => void;
}

export function CommentForm({ post_slug, onSuccess }: CommentFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      if (!content.trim()) {
        setError('请输入评论内容');
        setLoading(false);
        return;
      }

      if (content.length > 1000) {
        setError('评论长度不超过 1000 字符');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_slug,
          author_name: name || '匿名',
          author_email: email || null,
          content,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || '提交失败');
      } else {
        setSuccess(true);
        setName('');
        setEmail('');
        setContent('');
        onSuccess?.();
      }
    } catch (err: any) {
      setError(err.message || '提交失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-slate-50 dark:bg-slate-900 p-6 rounded-lg border dark:border-slate-700">
      <h3 className="font-bold text-lg">发表评论</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">昵称（可选）</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
            className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:border-blue-600"
            placeholder="输入你的昵称"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">邮箱（可选）</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:border-blue-600"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">评论内容 *</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={1000}
          rows={4}
          required
          className="w-full px-4 py-2 border rounded-lg dark:bg-slate-800 dark:border-slate-700 focus:outline-none focus:border-blue-600 resize-none"
          placeholder="分享你的想法..."
        />
        <p className="text-xs text-slate-500 mt-1">{content.length}/1000</p>
      </div>

      {error && <div className="text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded">{error}</div>}
      {success && <div className="text-green-600 text-sm bg-green-50 dark:bg-green-900/20 p-3 rounded">✓ 评论已发布</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {loading ? '提交中...' : '发表评论'}
      </button>
    </form>
  );
}
