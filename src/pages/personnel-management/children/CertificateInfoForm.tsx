import LabelForm from '@/components/LabelForm';
import IndustryService from '@/services/industry.service';
import PersonnelService from '@/services/personnel.service';
import { Button, Form, Input, message, Select } from 'antd';
import { useEffect } from 'react';
import { useAsync, useAsyncFn } from 'react-use';

const CertificateInfoForm = (props: any) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (props.data && props.userName) {
      form.setFieldsValue({ ...props.data, name: props.userName });
    }
  }, [props.data]);

  const industryListState = useAsync(async () => {
    return await IndustryService.fetchIndustryList();
  });

  const [state, doFetch] = useAsyncFn(async () => {
    const values = await form.validateFields();
    try {
      if (props.type === 'create') {
        await PersonnelService.createCertificate(values);
      } else {
        await PersonnelService.updateCertificate({ ...props.data, ...values });
      }
      props.onNext();
    } catch (error) {
      message.error('保存失败');
    }
  }, [form]);

  const formlist = [
    {
      label: '姓名',
      name: 'name',
      required: true,
      children: <Input disabled value={props.userName} />,
    },
    { label: '专业', name: 'educationMajor' },
    { label: '学历', name: 'education' },
    { label: '职称', name: 'title' },
    { label: '职称证专业', name: 'titleMajor' },
    { label: '注安专业', name: 'certificateMajor' },
    { label: '注安级别', name: 'rank' },
    { label: '注安证书编号', name: 'certificateNumber' },
    { label: '许可证号', name: 'licenceNumber' },
    {
      label: '行业类型',
      name: 'industryType',
      required: true,
      children: (
        <Select
          options={industryListState.value
            ?.map((item: any) => item.industryType)
            .map((item: any) => ({ label: item, value: item }))}
        />
      ),
    },
    {
      label: '职务',
      name: 'duty',
      children: (
        <Select
          options={['项目负责人', '技术负责人', '过程控制负责人', '普通技术人员'].map(
            (item: any) => ({ label: item, value: item }),
          )}
        />
      ),
    },
  ];

  return (
    <>
      {(industryListState.value || props.type === 'create') && (
        <>
          <LabelForm
            props={{
              form,
              onFinish: doFetch,
              labelCol: { span: 3 },
              wrapperCol: { span: 20 },
            }}
            formlist={formlist}
          />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button
              type="primary"
              onClick={doFetch}
              loading={state.loading}
              style={{ marginRight: '20px' }}
            >
              保存
            </Button>
            {props.type === 'edit' && (
              <Button
                type="primary"
                onClick={() => {
                  PersonnelService.deleteCertificate(props.data.id);
                  form.resetFields();
                }}
              >
                删除
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default CertificateInfoForm;
