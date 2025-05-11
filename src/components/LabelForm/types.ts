import { FormItemProps, FormProps } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ReactNode } from 'react';

export interface LabelFormItem extends Omit<FormItemProps, 'children'> {
  label?: string;
  name?: string;
  required?: boolean;
  children?: ReactNode | ((form: FormInstance) => ReactNode);
  rules?: any[];
  shouldUpdate?: boolean | ((prevValues: any, curValues: any) => boolean);
}

export interface LabelFormProps {
  props: FormProps;
  formlist: LabelFormItem[];
  defaultRules?: boolean;
}
