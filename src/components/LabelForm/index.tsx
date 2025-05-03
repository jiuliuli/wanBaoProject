import { Form, Input } from 'antd';
import { FormProps } from 'antd/lib/form';
import React from 'react';
import { LabelFormItem } from './types';

interface LabelFormProps {
    props: FormProps;
    formlist: LabelFormItem[];
}

const LabelForm: React.FC<LabelFormProps> = ({ props, formlist }) => {
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
                            {(form) => {
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
                        rules={rules}
                        {...rest}
                    >
                        {typeof children === 'function' && props.form ? children(props.form) : (children || <Input />)}
                    </Form.Item>
                );
            })}
        </Form>
    );
};

export default LabelForm; 