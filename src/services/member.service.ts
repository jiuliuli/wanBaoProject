import Request from "./request";
export const MemberManagementService = {
    fetchMemberByProjectId: async (projectId: string) => {
        const url = `/v1/getMember/${projectId}`;
        return Request.get(url).then(res => res.data);
    }
}

export default MemberManagementService;