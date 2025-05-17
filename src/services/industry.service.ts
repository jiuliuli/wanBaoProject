import Request from './request';

const IndustryService = {
  fetchIndustryList: async () => {
    const url = `/v1/getIndustryList`;
    return Request.get(url).then((res: any) => res.data);
  },
  updateIndustry: async (data: any) => {
    const url = `/v1/editIndustryList`;
    return Request.put(url, data).then((res: any) => res.data);
  },
};

export default IndustryService;
