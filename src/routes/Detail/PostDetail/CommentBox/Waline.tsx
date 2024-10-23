import { useEffect, useState } from 'react';
import { CONFIG } from 'site.config';
// 扩展 window 对象，使其包含 Waline
declare global {
  interface Window {
    Waline: Waline; // 使用自定义接口
  }
}

// 定义 Waline 类型
interface Waline {
  commentCount: any;
  init: (options: {
    el: string;
    lang: string;
    path: string;
    serverURL: string;
    comment: true, // 启用评论数量统计
  }) => void;
}

type Props = {
  id: string;
  slug: string;
  title: string;
}

const WalineComponent: React.FC<Props> = ({ id, slug, title }) => {
  const [loading, setLoading] = useState(true); // 加载状态

  useEffect(() => {
    const walineScript = document.createElement('script');
    walineScript.src = '/waline.js'; // 修改为你本地的 waline.js 路径
    walineScript.defer = true;
    document.body.appendChild(walineScript);

    walineScript.onload = () => {
      if (window.Waline) {
        window.Waline.init({
          serverURL: CONFIG.waline.serverURL, // Waline 的服务器地址
          el: '#waline', // 评论挂载的元素
          lang: 'zh-CN', // 设置语言
          path: window.location.pathname, // 评论路径
          comment: true, // 启用评论数量统计
        });
        setLoading(false); // 加载完成
      }
    };

    walineScript.onerror = () => {
      console.error('Failed to load Waline script');
      setLoading(false); // 加载失败
    };

    return () => {
      document.body.removeChild(walineScript);
    };
  }, [id, slug, title]); // 加入 title 作为依赖项

  return (
    <div>
      {loading && <p>加载评论中...</p>} {/* 加载提示 */}
      <div id="waline" />
    </div>
  );
};

export default WalineComponent;
