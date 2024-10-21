import React, { useEffect, useState } from 'react';

interface CommentCount {
  url: string;
  count: number;
}

const CommentCount: React.FC<{ urls: string[]; envId: string }> = ({ urls, envId }) => {
  const [counts, setCounts] = useState<CommentCount[]>([]);
  const [error, setError] = useState<string | null>(null);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)); // 等待函数

  useEffect(() => {
    const getCommentsCount = async () => {
      try {
        const res = await window.twikoo.getCommentsCount({
          envId,
          urls,
          includeReply: false,
        });
        setCounts(res);
      } catch (err) {
        console.error('获取评论数错误:', err);
        setError('获取评论数失败');
        await sleep(2000); // 等待 2 秒
        getCommentsCount(); // 重试
      }
    };

    getCommentsCount();
  }, [envId, urls]);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {counts.length > 0 ? (
        counts.map(({ count }, idx) => (
          <div key={idx}>
            {count} 回复
          </div>
        ))
      ) : (
        <p>暂无评论</p>
      )}
    </div>
  );
};

export default CommentCount;
