import AutoTag from "@/components/AutoTag";
import ProjectManagementService from "@/services/project-management.service";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Descriptions, message } from "antd";

type ArchiveProps = {
    data: any[];
}
export default function Archive({ data }: ArchiveProps) {

    const handleDownload = async (document: string) => {
        const fileName = document.split(':')[0];
        const fileId = document.split(':')[1];
        try {
            const res = await ProjectManagementService.downloadFile(fileName, fileId);
            message.success('下载成功');
        } catch (error) {
            message.error('下载失败');
        }
    };

    return (
        <div>
            {data.map((item, idx) => (
                <Descriptions
                    key={idx}
                    title={`文件 - ${item.name}`}
                    bordered
                    size="small"
                    style={{ marginBottom: 24 }}
                >
                    <Descriptions.Item label="文件类别"><AutoTag options={['技术', '商务', '过控']} value={item.category} /></Descriptions.Item>
                    <Descriptions.Item label="扫描件或文档"> <Button
                        type="link"
                        icon={<DownloadOutlined />}
                        onClick={() => handleDownload(item.document)}
                    >
                        {item.document}
                    </Button>
                    </Descriptions.Item>
                    <Descriptions.Item label="数量">{item.quantity}</Descriptions.Item>
                    <Descriptions.Item label="备注">{item.memo ?? '-'}</Descriptions.Item>
                </Descriptions>
            ))}
        </div>
    );
}