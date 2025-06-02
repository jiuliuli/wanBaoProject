import ProjectManagementService from '@/services/project-management.service';
import { OverControlItem } from '@/types/project.types';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Descriptions, message } from 'antd';

type OverControlProps = {
  data: OverControlItem[];
};

export default function OverControl({ data }: OverControlProps) {
  const handleDownload = async (document: string) => {
    const fileName = document.split(':')[0];
    const fileId = document.split(':')[1];
    try {
      const res = await ProjectManagementService.downloadFile(fileName, fileId);
      console.log(res);
    } catch (error) {
      message.error('下载失败');
    }
  };

  return (
    <div>
      {data.map(item => (
        <Descriptions key={item.id} bordered style={{ marginBottom: 16 }}>
          <Descriptions.Item label="过控文件名称">{item.name}</Descriptions.Item>
          <Descriptions.Item label="过控文档">
            <Button
              type="link"
              icon={<DownloadOutlined />}
              onClick={() => handleDownload(item.document)}
            >
              {item.document}
            </Button>
          </Descriptions.Item>
          <Descriptions.Item label="文档数量">{item.quantity}</Descriptions.Item>
          <Descriptions.Item label="备注">{item.memo || '-'}</Descriptions.Item>
        </Descriptions>
      ))}
    </div>
  );
}
