import Request from './request';
const DepartmentService = {
  fetchDepartmentList: async () => {
    const url = `/v1/getDivision`;
    return Request.get(url).then(res => res.data);
  },
  fetchDepartmentById: async (divisionName: string) => {
    const url = `/v1/getDivision`;
    return Request.get(url).then(res =>
      res.data.find((item: any) => item.divisionName === divisionName),
    );
  },
  createDepartment: async (data: any) => {
    const url = `/v1/addDivision`;
    return Request.post(url, data).then(res => res.data);
  },
  updateDepartment: async (data: any) => {
    const url = `/v1/editDivision`;
    return Request.put(url, data).then(res => res.data);
  },
};

export default DepartmentService;
