import { processList } from "@/services/mocks";

const ProcessManagementService = {
    fetchProcessList: async () => {
        return Promise.resolve(processList);
    },
    agreeProcess: async (id: number) => {
        return Promise.resolve();
    },
    disagreeProcess: async (id: number) => {
        return Promise.resolve();
    },
    fetchProcessById: async (id: string) => {
        return Promise.resolve(processList.data.find((item) => item.id === id));
    }
};

export default ProcessManagementService;