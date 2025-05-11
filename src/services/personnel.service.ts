import Request from './request';

const PersonnelService = {
  fetchPersonnelList: async (params: any) => {
    const url = `/v1/getAllStaff`;
    return Request.get(url, params).then(res => res.data);
  },
  getPersonnelById: async (id: string) => {
    const url = `/v1/getStaff/${id}`;
    return Request.get(url).then(res => res.data);
  },
  updatePersonnel: async (values: any) => {
    const url = `/v1/editStaff`;
    return Request.put(url, values).then(res => res.data);
  },
  createPersonnel: async (values: any) => {
    const url = `/v1/addStaff`;
    return Request.post(url, values).then(res => res.data);
  },
};
export default PersonnelService;
