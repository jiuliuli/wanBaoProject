import { Tooltip } from 'antd';
import React from 'react';

interface LongTextProps {
    children: React.ReactNode;
    maxLength?: number;
    tooltipProps?: any;
}

const LongTextContent: React.FC<LongTextProps> = ({
    children,
    maxLength = 20,
    tooltipProps = {}
}) => {
    // 如果children不是字符串，直接返回
    if (typeof children !== 'string') {
        return <>{children}</>;
    }

    const content = children as string;

    // 如果内容长度小于等于maxLength，直接返回
    if (content.length <= maxLength) {
        return <>{content}</>;
    }

    // 截断文本并添加省略号
    const truncatedText = `${content.substring(0, maxLength)}...`;

    return (
        <Tooltip
            title={content}
            placement="topLeft"
            overlayStyle={{ maxWidth: '400px', wordBreak: 'break-word' }}
            {...tooltipProps}
        >
            <span style={{ cursor: 'pointer' }}>{truncatedText}</span>
        </Tooltip>
    );
};

export default LongTextContent; 