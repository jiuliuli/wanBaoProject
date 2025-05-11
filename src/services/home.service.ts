import Request from './request';

const HomeService = {
  getTotalData: async (operator: string) => {
    const url = `/v1/getMyProcedure/${operator}`;
    return Request.get(url).then(res => res.data);
  },
};

export default HomeService;
