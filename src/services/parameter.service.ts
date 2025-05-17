import Request from './request';

const ParameterConfigurationService = {
  fetchParameterList: async () => {
    const url = '/v1/getParameterList';
    return Request.get(url).then((res: any) => res.data);
  },
  updateParameter: async (values: any) => {
    const url = '/v1/editParameterList';
    return Request.put(url, values).then((res: any) => res.data);
  },
};

export default ParameterConfigurationService;
