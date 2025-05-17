import LabelForm from '@/components/LabelForm';
import { Input } from 'antd';

const formlist = [
  { label: '姓名', name: 'realName', required: true },
  { label: '部门', name: 'division', required: true },
  { label: '基本工资', name: 'baseSalary', children: <Input /> },
  { label: '证书津贴', name: 'certificateAllowance', children: <Input /> },
  { label: '职称津贴', name: 'titleAllowance', children: <Input /> },
  { label: '专业津贴', name: 'majorAllowance', children: <Input /> },
  { label: '绩效工资', name: 'performanceSalary', children: <Input /> },
  { label: '社保基数', name: 'socialSecurityBase', children: <Input /> },
  { label: '公积金', name: 'providentFund', children: <Input /> },
  { label: '自费公积金', name: 'selfProvidentFund', children: <Input /> },
];

const SalarySocialForm = (props: any) => (
  <LabelForm formlist={formlist} props={props} defaultRules />
);

export default SalarySocialForm;
