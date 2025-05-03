import ProcessManagementService from "@/services/process.service";
import { useNavigate, useParams } from "@umijs/max";
import { Form } from "antd";
import { useEffect, useState } from "react";
import { useAsync } from "react-use";

export default function ProcessManagementEdit() {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [type, setType] = useState<string>();
    const navigate = useNavigate();
    const processState = useAsync(async () => {
        if (id) {
            return await ProcessManagementService.fetchProcessById(id);
        }
    }, [id]);

    useEffect(() => {
        if (id && processState.value) {
            form.setFieldsValue(processState.value);
            setType('edit');
        } else {
            setType('create');
        }
    }, [id, form, processState.value]);

    return <div>ProcessManagementEdit</div>;
}