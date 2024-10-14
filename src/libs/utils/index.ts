export function formatDate(date: any, local: any) {
  const d = new Date(date);

  // 如果 local 是 'zh-CN'，使用自定义格式
  if (local === 'zh-CN') {
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // 确保月份为两位数
    const day = d.getDate().toString().padStart(2, '0'); // 确保日期为两位数
    return `${year}/${month}/${day}`;
  }

  // 否则使用默认的 toLocaleDateString 格式化
  const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleDateString(local, options);
}
