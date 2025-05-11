import Request from './request';

const MarketProjectService = {
  fetchContractById: async (id: string) => {
    const url = `/v1/getContract/${id}`;
    return Request.get(url).then(res => res.data);
  },
};

export default MarketProjectService;
