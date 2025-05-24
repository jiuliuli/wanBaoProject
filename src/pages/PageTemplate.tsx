import { Card, Typography } from 'antd';
import React, { ReactNode } from 'react';

const { Title } = Typography;

interface PageTemplateProps {
  title: string;
  children?: ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ title, children }) => {
  return (
    <Card>
      <Title level={2}>{title}</Title>
      {children}
    </Card>
  );
};

export default PageTemplate;
