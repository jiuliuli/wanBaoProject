import AutoTag from "@/components/AutoTag";
import PATH_ENUM from "@/components/routes/path";
import { PROJECT_STATUS } from "@/constants/project.constants";
import { useTableDataFn } from "@/hooks/useTableDataFn";
import IndustryService from "@/services/industry.service";
import ProjectManagementService from "@/services/project-management.service";
import { Link, useNavigate } from "@umijs/max";
import { Button, Card, Col, Empty, Row, Tabs } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useAsync } from "react-use";
import styles from '../styles.less';

const ProjectCard = ({ project, navigate, industryList }: { project: any, navigate: any, industryList: string[] }) => {
    return (
        <Card
            hoverable
            className={styles.projectCard}
            title={
                <div className={styles.cardTitle}>
                    {project.shortName ? <div>{project.shortName}</div> : null}
                    <AutoTag value={project.status} options={PROJECT_STATUS} />
                </div>
            }
            extra={
                <div>
                    <Button type="link" onClick={() => navigate(PATH_ENUM.PROJECT_DETAIL.replace(':id', project.projectNumber.toString()))}>查看</Button>
                    <Button type="link" onClick={() => navigate(PATH_ENUM.PROJECT_EDIT.replace(':id', project.projectNumber.toString()))}>编辑</Button>
                </div>
            }
        >
            <div className={styles.cardContent}>

                {project.projectNumber ? <p><strong>项目编号：</strong>{project.projectNumber}</p> : null}
                {project.projectName ? <p>
                    <strong>项目名称：</strong>
                    <Link to={PATH_ENUM.PROJECT_DETAIL.replace(':id', project.projectNumber.toString())}>{project.projectName}</Link>
                </p> : null}
                {project.customerName ? <p><strong>客户名称：</strong>{project.customerName}</p> : null}
                {project.source ? <p><strong>项目来源：</strong>{project.source}</p> : null}
                {project.industryType ? <p>
                    <strong>行业类型：</strong>
                    <AutoTag value={project.industryType} options={industryList} />
                </p> : null}
                {project.establisher ? <p><strong>市场人员（签单人）：</strong>{project.establisher}</p> : null}
                {project.amount ? <p><strong>项目金额：</strong>{project.amount}</p> : null}
                {project.startTime && project.endTime ? <p><strong>计划时间：</strong>{project.startTime?.split('T')[0]} ~ {project.endTime?.split('T')[0]}</p> : null}
                {project.taxFee ? <p><strong>增值税费：</strong>{project.taxFee}</p> : null}
                {project.reviewAudit ? <p><strong>评审费：</strong>{project.reviewAudit}</p> : null}
                {project.projectAudit ? <p><strong>项目负责人审核费：</strong>{project.projectType}</p> : null}
                {project.techAudit ? <p><strong>技术负责人审核费：</strong>{project.techAudit}</p> : null}
                {project.firstAudit ? <p><strong>审核费：</strong>{project.firstAudit}</p> : null}
                {project.commissionFee ? <p><strong>市场提成：</strong>{project.commissionFee}</p> : null}
                {project.compileCost ? <p><strong>绘制成本：</strong>{project.compileCost}</p> : null}
                {project.channelFee ? <p><strong>渠道费：</strong>{project.channelFee}</p> : null}
                {project.printFee ? <p><strong>打印费：</strong>{project.printFee}</p> : null}
                {project.travelFee ? <p><strong>差旅费：</strong>{project.travelFee}</p> : null}
                {project.ventureFactor ? <p><strong>风险因素：</strong>{project.ventureFactor}</p> : null}
                {project.mainVenture ? <p><strong>主要风险：</strong>{project.mainVenture}</p> : null}
                {project.technicalVenture ? <p><strong>技术风险：</strong>{project.technicalVenture}</p> : null}
                {project.industryVenture ? <p><strong>行业风险：</strong>{project.industryVenture}</p> : null}
                {project.projectScale ? <p><strong>项目投资规模：</strong>{project.projectScale}</p> : null}
                {project.expert ? <p><strong>是否外聘专家：</strong>{project.expert}</p> : null}
                {project.environment ? <p><strong>环境：</strong>{project.environment}</p> : null}
                {project.companyVenture ? <p><strong>公司风险：</strong>{project.companyVenture}</p> : null}
                {project.bidBond ? <p><strong>投标保证金：</strong>{project.bidBond}</p> : null}
                {project.auditQuantity ? <p><strong>送审数量：</strong>{project.auditQuantity}</p> : null}
                {project.backupQuantity ? <p><strong>备案数量：</strong>{project.backupQuantity}</p> : null}
                {project.compiler ? <p><strong>编制人：</strong>{project.compiler}</p> : null}
                {project.director ? <p><strong>负责人：</strong>{project.director}</p> : null}
                {project.highRisk ? <p><strong>是否法定：</strong>{project.highRisk}</p> : null}
                {project.evaluateType ? <p><strong>评价类型：</strong>{project.evaluateType}</p> : null}

            </div>
        </Card>
    );
};

export default function ProjectManagementList() {
    const navigate = useNavigate();
    const [params] = useState({
        userName: 'dpy',
        // userName: localStorage.getItem('user')?.userName,
    });
    const [activeKey, setActiveKey] = useState('all');

    const [state, doFetch] = useTableDataFn({
        Fetch: ProjectManagementService.fetchProjectListByUserName,
        params: params,
    });

    const industryListState = useAsync(async () => {
        return await IndustryService.fetchIndustryList();
    });

    useEffect(() => {
        doFetch();
    }, []);

    const groupedProjects = useMemo(() => {
        if (!state.value?.dataSource) return {};

        const allProjects = state.value.dataSource || [];
        const grouped: Record<string, any[]> = {};

        PROJECT_STATUS.forEach(status => {
            grouped[status] = allProjects.filter((project: any) => project.status === status);
        });

        return grouped;
    }, [state.value?.dataSource]);

    const tabItems = useMemo(() => {
        const items = PROJECT_STATUS.map(status => {
            const count = groupedProjects[status]?.length || 0;
            return {
                key: status,
                label: `${status} (${count})`
            };
        });

        return items;
    }, [groupedProjects]);


    useEffect(() => {
        if (tabItems.length > 0 && activeKey === 'all') {
            setActiveKey(tabItems[0]?.key);
        }
    }, [tabItems]);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <h2 className={styles.title}>项目管理</h2>
                <Button type="primary" onClick={() => navigate(PATH_ENUM.ALL_PROJECT_LIST)}>
                    查看全部项目
                </Button>
                <Button
                    type="primary"
                    onClick={() => navigate(PATH_ENUM.PROJECT_CREATE)}
                    className={styles.createButton}
                >
                    新建项目
                </Button>
            </div>

            <div className={styles.tabContainer}>
                <Tabs
                    activeKey={activeKey}
                    onChange={setActiveKey}
                    items={tabItems}
                />

                {state.loading ? (
                    <div className={styles.loadingContainer}>加载中...</div>
                ) : (
                    <div className={styles.cardsContainer}>
                        {groupedProjects[activeKey]?.length > 0 ? (
                            <Row gutter={[16, 16]}>
                                {groupedProjects[activeKey].map((project: any) => (
                                    <Col key={project.id} xs={24} sm={12} md={8} lg={6}>
                                        <ProjectCard
                                            project={project}
                                            navigate={navigate}
                                            industryList={industryListState.value?.map((item: any) => item.industryType) || []}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <Empty description="该状态下暂无项目数据" />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
