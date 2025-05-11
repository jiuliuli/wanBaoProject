import { Form, Input } from 'antd';
import React from 'react';
import { LabelFormProps } from './types';

const LabelForm: React.FC<LabelFormProps> = ({ props, formlist, defaultRules }) => {
  return (
    <Form {...props}>
      {formlist.map((item, index) => {
        const { label, name, required, rules, children, shouldUpdate, ...rest } = item;

        if (shouldUpdate) {
          return (
            <Form.Item
              key={index}
              label={label}
              required={required}
              shouldUpdate={shouldUpdate}
              {...rest}
            >
              {form => {
                if (typeof children === 'function') {
                  return children(form);
                }
                return children;
              }}
            </Form.Item>
          );
        }

        return (
          <Form.Item
            key={index}
            label={label}
            name={name}
            required={required}
            rules={defaultRules ? [{ required: true, message: `请输入${label}` }] : rules}
            {...rest}
          >
            {typeof children === 'function' && props.form
              ? children(props.form)
              : children || <Input />}
          </Form.Item>
        );
      })}
    </Form>
  );
};

export default LabelForm;
