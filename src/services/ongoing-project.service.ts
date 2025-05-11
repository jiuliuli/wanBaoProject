import Request from './request';

const OngoingProjectService = {
  fetchMaterialById: async (id: string) => {
    const url = `/v1/getResource/${id}`;
    return Request.get(url).then(res => res.data);
  },
};

export default OngoingProjectService;
