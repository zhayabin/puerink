import { useEffect, useState } from 'react';

type Props = {
  slug: string;
  serverURL: string;
};

const CommentCount: React.FC<Props> = ({ slug, serverURL }) => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    console.log("Slug:", slug);
    console.log("Server URL:", serverURL);
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = '/comment.js';
      script.async = true;

      script.onload = async () => {
        if (window.Waline) {
          try {
            // 调用 Waline 的 commentCount 函数
            const abort = window.Waline.commentCount({
              serverURL,
              path: slug,
            });

            const countElement = document.querySelector(
              `.waline-comment-count[data-path="${slug}"]`
            );

            if (countElement) {
              const observer = new MutationObserver(() => {
                const newCount = parseInt(countElement.textContent || '0', 10);
                setCount(newCount);
              });

              observer.observe(countElement, { childList: true });

              // 初始设置评论数
              setCount(parseInt(countElement.textContent || '0', 10));

              return () => {
                observer.disconnect();
                abort(); // 在组件卸载时取消请求
              };
            }
          } catch (error) {
            console.error("获取评论数失败:", error);
          }
        }
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    };

    loadScript();
  }, [slug, serverURL]);

  return (
    <div>
      {count !== null ? (
        <span>{count} 条评论</span>
      ) : (
        <span>加载评论数中...</span>
      )}
      <span className="waline-comment-count" data-path={slug} style={{ display: 'none' }} />
    </div>
  );
};

export default CommentCount;
