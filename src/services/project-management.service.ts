import Request from "./request";
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
        const url = `/v1/searchProject?projectNumber=${id}`;
        return Request.get(url).then(res => res.data);
    },
    fetchEvaluateTypeList: async () => {
        const url = `/v1/getEvaluateType`;
        return Request.get(url).then(res => res.data);
    },
    updateProject: async (values: any) => {
        const url = ``;
        return Promise.resolve(values);
    },
    createProject: async (values: any) => {
        const url = ``;
        return Promise.resolve(values);
    },
};

export default ProjectManagementService;