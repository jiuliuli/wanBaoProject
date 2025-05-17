import LabelForm from '@/components/LabelForm';
import { Input } from 'antd';

const formlist = [
  { label: '部门', name: 'division', required: true },
  { label: '姓名', name: 'realName', required: true },
  { label: '基本工资', name: 'baseSalary', children: <Input /> },
  { label: '职务津贴', name: 'positionAllowance', children: <Input /> },
  { label: '绩效工资', name: 'performanceSalary', children: <Input /> },
  { label: '提成', name: 'commission', children: <Input /> },
  { label: '餐补', name: 'mealSubsidy', children: <Input /> },
  { label: '税前补', name: 'preTaxSubsidy', children: <Input /> },
  { label: '税前扣', name: 'preTaxDeduction', children: <Input /> },
  { label: '税前工资', name: 'preTaxSalary', children: <Input /> },
  { label: '社保', name: 'socialSecurity', children: <Input /> },
  { label: '公积金', name: 'providentFund', children: <Input /> },
  { label: '其他扣款', name: 'otherDeduction', children: <Input /> },
  { label: '其他补', name: 'otherSubsidy', children: <Input /> },
  { label: '税款', name: 'tax', children: <Input /> },
  { label: '实发', name: 'actualPay', children: <Input /> },
  { label: '备注', name: 'remark', children: <Input /> },
];

const SalaryPayForm = (props: any) => <LabelForm formlist={formlist} props={props} defaultRules />;

export default SalaryPayForm;
