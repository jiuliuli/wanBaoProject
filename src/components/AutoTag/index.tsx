import { Tag } from 'antd';

type AutoTagProps = {
  options: string[];
  value: string;
  color?: string;
};

export default function AutoTag({ options, value, color }: AutoTagProps) {
  const presetColors = [
    'blue',
    'green',
    'red',
    'orange',
    'purple',
    'cyan',
    'geekblue',
    'lime',
    'gold',
    'magenta',
  ];

  const getColorIndex = (text: string) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % presetColors.length;
  };

  // 如果未找到匹配的值，使用第一个选项
  const displayText = options.includes(value) ? value : options[0] || '';
  const tagColor = color || presetColors[getColorIndex(displayText)];

  return <Tag color={tagColor}>{displayText}</Tag>;
}
