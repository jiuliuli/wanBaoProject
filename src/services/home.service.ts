import { totalData } from "@/services/mocks"

const HomeService = {
    getTotalData: async () => {
        return Promise.resolve(totalData)
    }
}

export default HomeService