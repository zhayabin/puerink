export function formatDate(date: any, local: any) {
  const d = new Date(date); // 直接添加时区
  const now = new Date();
  const currentYear = now.getFullYear();
  const diffInMillis = now.getTime() - d.getTime();
  const diffInDays = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');

  // 星期几的数组，周一到周日
  const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  // 如果是今年
  if (year === currentYear) {
    // 显示“今天”、“昨天”或“前天”
    if (diffInDays === 0) {
      return '今天';
    } else if (diffInDays === 1) {
      return '昨天';
    } else if (diffInDays === 2) {
      return '前天';
    } else if (diffInDays < 10) {
      // 30天内的日期
      return `${diffInDays}天前`;
    } else {
      // 超过30天的时间，在本年内，显示月日
      return `${month}/${day}`;
    }

  } else {
    // 不在今年，显示年/月/日
    return `${year}/${month}/${day}`;
  }
}
