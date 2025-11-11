'use client';

import { useEffect, useState, useCallback } from 'react';

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

interface CommentListProps {
  post_slug: string;
  refreshTrigger?: number;
}

export function CommentList({ post_slug, refreshTrigger }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadComments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/comments?post_slug=${encodeURIComponent(post_slug)}`);
      const data = await response.json();

      if (response.ok) {
        setComments(data.comments || []);
      } else {
        setError(data.error || '加载评论失败');
      }
    } catch (err: any) {
      setError(err.message || '加载评论失败');
    } finally {
      setLoading(false);
    }
  }, [post_slug]);

  useEffect(() => {
    loadComments();
  }, [post_slug, refreshTrigger, loadComments]);

  if (loading) {
    return <div className="text-center py-8 text-slate-600 dark:text-slate-400">加载评论中...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  if (comments.length === 0) {
    return <div className="text-center py-8 text-slate-600 dark:text-slate-400">暂无评论，欢迎抢沙发！</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">评论（{comments.length}）</h3>

      {comments.map(comment => (
        <div key={comment.id} className="p-4 border rounded-lg dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="font-medium">{comment.author_name}</p>
              <time className="text-xs text-slate-500">
                {new Date(comment.created_at).toLocaleString('zh-CN')}
              </time>
            </div>
          </div>
          <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}
