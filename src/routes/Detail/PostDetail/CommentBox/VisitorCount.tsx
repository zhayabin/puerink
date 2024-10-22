import React, { useEffect, useState } from 'react';

interface VisitorCountProps {
  envId: string; // 添加 envId 属性
}

const VisitorCount: React.FC<VisitorCountProps> = ({ envId }) => {
  const [visitors, setVisitors] = useState<number>(0);

  useEffect(() => {
    const updateVisitors = () => {
      const visitorsElement = document.getElementById('twikoo_visitors');
      if (visitorsElement) {
        const visitorCount = parseInt(visitorsElement.innerText) || 0;
        setVisitors(visitorCount);
      }
    };

    const interval = setInterval(updateVisitors, 1000); // 每秒更新一次
    const timeout = setTimeout(updateVisitors, 2000); // 2秒后读取一次访问量

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [envId]);

  return (
    <div>
      访问量: {visitors}
    </div>
  );
};

export default VisitorCount;
