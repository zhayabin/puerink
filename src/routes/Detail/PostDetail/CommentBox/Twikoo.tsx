import { useEffect, useState } from 'react';
import { CONFIG } from 'site.config';

// 扩展 window 对象，添加 Twikoo 类型
declare global {
  interface Window {
    twikoo: Twikoo;
  }
}

// 定义 Twikoo 类型
interface Twikoo {
  getCommentsCount: (options: { envId: string; urls: string[]; includeReply: boolean }) => Promise<any>;
  init: (options: { envId: string; el: string; lang: string; path: string }) => void;
  getVisitorCount: (options: { envId: string; path: string }) => Promise<number>; // 新增获取阅读量的方法
}

type Props = {
  id: string;
  slug: string;
  title: string;
};

const TwikooComponent: React.FC<Props> = ({ id, slug, title }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visitorCount, setVisitorCount] = useState<number>(0); // 阅读量状态

  useEffect(() => {
    const twikooScript = document.createElement('script');
    twikooScript.src = '/twikoo.min.js';
    twikooScript.defer = true;

    const onLoad = async () => {
      if (window.twikoo) {
        window.twikoo.init({
          envId: CONFIG.twikoo.envId,
          el: '#twikoo',
          lang: 'zh-CN',
          path: window.location.pathname,
        });
        setLoading(false);

        // 获取阅读量
        try {
          const count = await window.twikoo.getVisitorCount({
            envId: CONFIG.twikoo.envId,
            path: window.location.pathname,
          });
          setVisitorCount(count);
        } catch (error) {
          console.error('获取阅读量失败:', error);
        }
      } else {
        setError('Twikoo 未加载');
      }
    };

    const onError = () => {
      console.error('加载 Twikoo 脚本失败');
      setError('加载评论功能失败');
      setLoading(false);
    };

    twikooScript.onload = onLoad;
    twikooScript.onerror = onError;

    document.body.appendChild(twikooScript);

    return () => {
      document.body.removeChild(twikooScript);
    };
  }, [id, slug, title]);

  return (
    <div>
      {loading && <p>加载评论中...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div id="twikoo" />
    </div>
  );
};

export default TwikooComponent;
