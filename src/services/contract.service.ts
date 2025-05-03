import Request from "./request";
export const ContractManagementService = {
    fetchContractByProjectId: async (projectId: string) => {
        const url = `/v1/getContract/${projectId}`;
        return Request.get(url).then(res => res.data);
    }

}

export default ContractManagementService;