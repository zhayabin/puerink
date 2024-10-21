import React, { useEffect, useState } from 'react';

interface CommentCountResponse {
  url: string;
  count: number;
}

const CommentCount: React.FC<{ urls: string[]; envId: string }> = ({ urls, envId }) => {
  const [counts, setCounts] = useState<number[]>([]);

  useEffect(() => {
    const getCommentsCount = async () => {
      try {
        const res: CommentCountResponse[] = await window.twikoo.getCommentsCount({
          envId,
          urls,
          includeReply: false,
        });
        setCounts(res.map(item => item.count));
      } catch {
        setCounts([0]); // 错误时显示 "0"
      }
    };
    getCommentsCount();
  }, [envId, urls]);

  return (
    <div>
      {counts.length > 0 ? (
        counts.map((count, idx) => (
          <div key={idx}>
            {count === 0 ? '无' : count}
            <span role="img" aria-label="回复气泡">评论</span>

          </div>
        ))
      ) : (
        <span role="img" aria-label="回复气泡">评论</span> // 显示回复气泡 emoji
      )}
    </div>
  );
};

export default CommentCount;
