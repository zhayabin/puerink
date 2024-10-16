import { useEffect, useState } from 'react';
import { CONFIG } from 'site.config';

// 扩展 window 对象，使其包含 twikoo
declare global {
  interface Window {
    twikoo: Twikoo; // 使用自定义接口
  }
}

// 定义 Twikoo 类型
interface Twikoo {
  init: (options: {
    envId: string;
    el: string;
    lang: string;
    path: string;
  }) => void;
}

type Props = {
  id: string;
  slug: string;
  title: string;
}

const TwikooComponent: React.FC<Props> = ({ id, slug, title }) => {
  const [loading, setLoading] = useState(true); // 加载状态

  useEffect(() => {
    const twikooScript = document.createElement('script');
    twikooScript.src = '/twikoo.nocss.js'; // 修改为本地路径

    twikooScript.defer = true;
    document.body.appendChild(twikooScript);

    twikooScript.onload = () => {
      if (window.twikoo) {
        window.twikoo.init({
          envId: CONFIG.twikoo.envId,
          el: '#twikoo',
          lang: 'zh-CN',
          path: window.location.pathname
        });
        setLoading(false); // 加载完成
      }
    };

    twikooScript.onerror = () => {
      console.error('Failed to load Twikoo script');
      setLoading(false); // 加载失败
    };

    return () => {
      document.body.removeChild(twikooScript);
    };
  }, [id, slug, title]); // 加入 title 作为依赖项

  return (
    <div>
      {loading && <p>加载评论中...</p>} {/* 加载提示 */}
      <div id="twikoo" />
    </div>
  );
};

export default TwikooComponent;
