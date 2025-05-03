import Request from "./request";

const IndustryService = {
    fetchIndustryList: async () => {
        const url = `/v1/getIndustryList`;
        return Request.get(url).then(res => res.data);
    },
};

export default IndustryService;