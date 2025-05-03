// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}

export function formatDate(timestamp: string) {
  const date = new Date(Number(timestamp));
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}


export function getSelectOptions(enumObj: Record<string | number, string>) {
  return Object.entries(enumObj).map(([value, label]) => ({
    label,
    value: Number(value),
  }));
}

export const getGreeting = () => {
  const hours = new Date().getHours();
  if (hours < 12) {
    return '上午好';
  } else if (hours < 18) {
    return '下午好';
  } else {
    return '晚上好';
  }
};
