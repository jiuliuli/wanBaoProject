import { Card, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

interface PageTemplateProps {
  title: string;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ title }) => {
  return (
    <Card>
      <Title level={2}>{title}</Title>
      <p>页面内容还在开发中...</p>
    </Card>
  );
};

export default PageTemplate;
