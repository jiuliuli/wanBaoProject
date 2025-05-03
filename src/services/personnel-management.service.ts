import { personnelList } from "@/services/mocks";
import { PersonnelVO } from "@/types/personnel.types";

const PersonnelManagementService = {
    fetchPersonnelList: () => {
        return Promise.resolve(personnelList);
    },
    fetchPersonById: (id: string) => {
        return Promise.resolve(personnelList.data.find((item) => item.id === parseInt(id)));
    },
    createPerson: (values: PersonnelVO) => {
        return Promise.resolve(personnelList.data.push(values));
    },
    updatePerson: (values: PersonnelVO) => {
        return Promise.resolve(personnelList.data.push(values));
    }
}

export default PersonnelManagementService;
