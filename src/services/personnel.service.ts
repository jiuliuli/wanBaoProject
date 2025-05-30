import Request from './request';

const PersonnelService = {
    fetchPersonnelList: async (params: any) => {
        const url = `/v1/getStaff`;
        return Request.get(url, params).then(res => res.data);
    },
    getPersonnelById: async (id: string) => {
        const url = `/v1/getStaff?userName=${id}`;
        return Request.get(url).then(res => res.data);
    },

    getCertificateById: async (id: string) => {
        const url = `/v1/searchStaffCertificate?userName=${id}`;
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
    createCertificate: async (values: any) => {
        const url = `/v1/addStaffCertificate`;
        return Request.post(url, values).then(res => res.data);
    },
    updateCertificate: async (values: any) => {
        const url = `/v1/editStaffCertificate`;
        return Request.put(url, values).then(res => res.data);
    },
    deleteCertificate: async (id: string) => {
        const url = `/v1/deleteStaffCertificate/${id}`;
        return Request.delete(url).then(res => res.data);
    },
    getRoleList: async () => {
        const url = `/v1/getRoleInfo`;
        return Request.get(url).then(res => res.data);
    },
    getRegionList: async () => {
        const url = `/v1/getRegionInfo`;
        return Request.get(url).then(res => res.data);
    },
};
export default PersonnelService;
