import Request from './request';

const HomeService = {
  getTotalData: async () => {
    const url = `/v1/getMyProcedure?status=待办`;
    return Request.get(url).then(res => res.data);
  },

  updateTaskStatus: async (data: any) => {
    const url = `/v1/submitProcedure`;
    return Request.post(url, data).then(res => res.data);
  },
};

export default HomeService;
