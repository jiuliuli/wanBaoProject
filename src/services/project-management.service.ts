import { request } from '@umijs/max';
import Request from './request';

const ProjectManagementService = {
  fetchProjectListByUserName: async (params: any) => {
    const url = `/v1/getMyProject/${params.userName}`;
    return Request.get(url, params).then(res => res.data);
  },
  fetchProjectList: async (params: any) => {
    const url = `/v1/searchProject`;
    return Request.get(url, params).then(res => res.data);
  },
  fetchProjectById: async (id: string) => {
    const url = `/v1/searchProject?projectNumber=${id}&finished=false`;
    return Request.get(url).then(res => res.data);
  },
  fetchEvaluateTypeList: async () => {
    const url = `/v1/getEvaluateType`;
    return Request.get(url).then(res => res.data);
  },
  updateProject: async (values: any) => {
    return Promise.resolve(values);
  },
  createProject: async (values: any) => {
    const url = `v1/createProject`;
    return Request.post(url, values).then(res => res.data);
  },
  fetchProgressById: async (id: string) => {
    const url = `/v1/getProjectProcedure/${id}`;
    return Request.get(url).then(res => res.data);
  },
  fetchPercent: async () => {
    const url = `/v1/getParameterList`;
    return Request.get(url).then(res => res.data);
  },
  updateProjectBasicInfo: async (values: any) => {
    const url = `/v1/updateProject`;
    return Request.put(url, values).then(res => res.data);
  },
  updateProgressInfo: async (id: string, values: any) => {
    return request(`/v1/project-management/progress/${id}`, {
      method: 'PUT',
      data: values,
    });
  },
  fetchReportSendById: async (id: string) => {
    const url = `/v1/getDelivery/${id}`;
    return Request.get(url).then((res: any) => res.data);
  },
  fetchMaterialListById: async (id: string) => {
    const url = `/v1/getResource/${id}`;
    return Request.get(url).then((res: any) => res.data);
  },
  fetchProjectMembersById: async (id: string) => {
    const url = `/v1/getMember/${id}`;
    return Request.get(url).then((res: any) => res.data);
  },
  fetchProjectNotesById: async (id: string) => {
    const url = `/v1/getNoteProcedure/${id}`;
    return Request.get(url).then((res: any) => res.data);
  },
  fetchOverControlById: async (id: string) => {
    const url = `/v1/getControl/${id}`;
    return Request.get(url).then((res: any) => res.data);
  },
  downloadFile: async (fileName: string, fileId: string) => {
    const url = `/v1/downloadFile/${fileName}/${fileId}`;
    return Request.get(url).then((res: any) => res.data);
  },
  fetchArchiveById: async (id: string) => {
    const url = `/v1/getArchive/${id}`;
    return Request.get(url).then((res: any) => res.data);
  },
  submitProjectAudit: async (data: any) => {
    const url = `/v1/submitProject`;
    return Request.post(url, data).then((res: any) => res.data);
  },
};

export default ProjectManagementService;
