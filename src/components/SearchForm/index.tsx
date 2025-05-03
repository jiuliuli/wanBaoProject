import { Button, Col, Form, Input, Row, Select } from 'antd';
import React from 'react';

interface SearchFormColumn {
  name: string;
  title: string;
  valueType: 'text' | 'digit' | 'select';
  options?: { label: string; value: any }[];
}

interface SearchFormProps {
  columns: SearchFormColumn[];
  onFinish: (values: any) => void;
  className?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ columns, onFinish, className }) => {
  const [form] = Form.useForm();

  const renderFormItem = (column: SearchFormColumn) => {
    switch (column.valueType) {
      case 'select':
        return <Select options={column.options} placeholder={`请选择${column.title}`} />;
      case 'digit':
        return <Input type="number" placeholder={`请输入${column.title}`} />;
      default:
        return <Input placeholder={`请输入${column.title}`} />;
    }
  };

  return (
    <Form form={form} onFinish={onFinish} className={className}>
      <Row gutter={40}>
        {columns.map(column => (
          <Col span={5} key={column.name}>
            <Form.Item name={column.name} label={column.title}>
              {renderFormItem(column)}
            </Form.Item>
          </Col>
        ))}
        <Col span={4}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => {
                form.resetFields();
                onFinish({});
              }}
            >
              重置
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
