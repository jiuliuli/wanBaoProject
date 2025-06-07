import AutoTag from '@/components/AutoTag';
import { ProcessInfoVO } from '@/types/project.types';
import { Descriptions, Tag } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

type ProgressInfoProps = {
  data: ProcessInfoVO[];
};

const NodeLine = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  .node {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    margin: 30px 18px;
    transition: transform 0.2s;
    .circle {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      margin-bottom: 4px;
      background: #ccc;
      transition: all 0.2s;
      border: 2px solid transparent;
    }
    .label {
      font-size: 12px;
      margin-top: 10px;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      white-space: pre-line;
      color: #333;
      letter-spacing: 2px;
      text-align: center;
      transition: all 0.2s;
    }
  }
  .node.current .circle {
    width: 18px;
    height: 18px;
    background: #52c41a;
    box-shadow: 0 0 0 4px #e6ffe6;
    border: 2.5px solid #389e34;
    position: relative;
    z-index: 2;
    /* 动态边框动画 */
    animation: current-border-glow 1.2s infinite alternate;
  }
  @keyframes current-border-glow {
    0% {
      box-shadow:
        0 0 0 2px #e6ffe6,
        0 0 8px 1px #52c41a;
      border-color: #389e34;
    }
    100% {
      box-shadow:
        0 0 0 4px #b7f5c6,
        0 0 16px 4px #52c41a;
      border-color: #52c41a;
    }
  }
  .node.selected {
    transform: scale(1.2);
    z-index: 1;
  }
  .node.selected .circle {
    border: 2.5px solid #1890ff;
    box-shadow: 0 0 0 3px #e6f7ff;
  }
  .node.passed .circle {
    background: #52c41a;
    border: 2px solid #52c41a;
  }
  .node.upcoming .circle {
    background: #ccc;
    border: 2px solid #ccc;
  }
  .arrow {
    font-size: 20px;
    color: #bfbfbf;
    margin: 0 0px;
    user-select: none;
    align-self: flex-start;
    margin-top: 20px;
  }
`;

const NodeLineWrapper = styled.div`
  width: 1200px;
  overflow-x: auto;
  margin-bottom: 24px;
`;

// 流程节点名称，按图片顺序
const nodeNames = [
  '立项审批',
  '技术审核项目风险',
  '财务审核项目风险',
  '总经理审批项目',
  '合同定稿',
  '合同修改',
  '合同盖章',
  '合同签订',
  '合同存档',
  '项目派单',
  '派单确认',
  '出告知书',
  '过控发告知书',
  '工作计划',
  '资料清单',
  '报告提交审核人审核',
  '一审修改',
  '提交技术负责人审核',
  '二审修改',
  '生成过控文件',
  '过控文件审核',
  '过控修改',
  '申请送申稿出版',
  '送申稿出版审批',
  '送申稿出版修改',
  '送申稿盖章出版',
  '送申版报告邮寄',
  '组织专家评审会',
  '备案版审核',
  '备案版修改',
  '备案版报告出版',
  '备案版报告邮寄',
  '报告存档申请',
  '报告存档审批',
  '完善存档资料',
  '备案版报告存档',
];

export default function ProgressInfo({ data }: ProgressInfoProps) {
  const currentSpotName = data.find(item => item.status === '待处理')?.spotName;
  const currentIndex = currentSpotName ? nodeNames.findIndex(name => name === currentSpotName) : -1;
  const [selected, setSelected] = useState(currentIndex === -1 ? 0 : currentIndex);

  if (!nodeNames.length) return <>暂无进度</>;

  const selectedNodeName = nodeNames[selected];
  const selectedData = data.find(item => item.spotName === selectedNodeName);

  function getStatusClass(idx: number) {
    if (currentIndex === -1) {
      return idx === 0 ? 'current' : 'upcoming';
    } else if (idx < currentIndex) return 'passed';
    else if (idx === currentIndex) return 'current';
    else return 'upcoming';
  }

  return (
    <>
      <NodeLineWrapper>
        <NodeLine>
          {nodeNames.map((name, idx) => {
            const isSelected = selected === idx;
            return (
              <React.Fragment key={name}>
                <div
                  className={`node ${getStatusClass(idx)}${isSelected ? ' selected' : ''}`}
                  onClick={() => setSelected(idx)}
                >
                  <div className="circle" />
                  <div className="label">{name}</div>
                </div>
                {idx !== nodeNames.length - 1 && <span className="arrow">→</span>}
              </React.Fragment>
            );
          })}
        </NodeLine>
      </NodeLineWrapper>
      <Descriptions title={`${selectedNodeName}详情`} bordered>
        {selectedData ? (
          <>
            <Descriptions.Item label="合同编号">{selectedData.contractNumber}</Descriptions.Item>
            <Descriptions.Item label="执行人">{selectedData.operator}</Descriptions.Item>
            <Descriptions.Item label="审核内容">{selectedData.operation}</Descriptions.Item>
            <Descriptions.Item label="紧急程度">
              <AutoTag
                options={['一般', '重要', '紧急', '通知', '抄送', '记事', '催办']}
                value={selectedData.rank}
              />
            </Descriptions.Item>
            <Descriptions.Item label="状态">
              <AutoTag options={['待处理', '已处理', '已转交']} value={selectedData.status} />
            </Descriptions.Item>
            <Descriptions.Item label="处理意见">{selectedData.opinion}</Descriptions.Item>
            <Descriptions.Item label="开始时间">
              {new Date(selectedData.startTime).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="完成时间">
              {new Date(selectedData.finishedTime ?? new Date()).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="处理结果">
              {selectedData.result === '同意' ? (
                <Tag color="green">同意</Tag>
              ) : (
                <Tag color="red">驳回</Tag>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="附件">{selectedData.attachment}</Descriptions.Item>
          </>
        ) : (
          <Descriptions.Item label="暂无数据">-</Descriptions.Item>
        )}
      </Descriptions>
    </>
  );
}
