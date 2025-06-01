import Request from './request';

const CompletedService = {
  fetchCompletedProjectListById: async (id: string) => {
    const url = `/v1/getMyProject?projectNumber=${id}`;
    return Request.get(url).then(res => res.data);
  },
  fetchMaterialById: async (id: string) => {
    const url = `/v1/getResource/${id}`;
    return Request.get(url).then(res => res.data);
  },
};

export default CompletedService;
