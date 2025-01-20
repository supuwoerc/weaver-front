import { useTranslator } from "@/hooks/useTranslator"
import { Drawer, Form, Input } from "@arco-design/web-react"
import FormItem from "@arco-design/web-react/es/Form/form-item"
import { useState } from "react"

interface RoleEditorProps {
    visible: boolean
    roleId?: number
    onOk?: () => void
    onCancel?: () => void
}
const RoleEditor: React.FC<RoleEditorProps> = ({ visible, onOk, onCancel }) => {
    const intlMapping = useTranslator({
        modalTitle: "role.modal.title",
        modalLabelName: "role.modal.label.name",
        modalPlaceholerName: "role.modal.placeholer.name",
        modalLabelPermission: "role.modal.label.permission",
        modalLabelUsers: "role.modal.label.users",
        modalPlaceholerPermission: "role.modal.placeholer.permission",
        modalPlaceholerUsers: "role.modal.placeholer.users",
        ruleRequired: "role.modal.rule.required",
    })
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [form] = Form.useForm()
    return (
        <Drawer
            width={"50%"}
            title={intlMapping.modalTitle}
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            confirmLoading={confirmLoading}
        >
            <Form form={form} layout="vertical">
                <FormItem
                    label={intlMapping.modalLabelName}
                    field="name"
                    rules={[
                        {
                            required: true,
                            message: intlMapping.ruleRequired,
                        },
                    ]}
                >
                    <Input placeholder={intlMapping.modalPlaceholerName} />
                </FormItem>
                <FormItem label={intlMapping.modalLabelPermission} field="permissions">
                    <Input placeholder={intlMapping.modalPlaceholerPermission} />
                </FormItem>
                <FormItem label={intlMapping.modalLabelUsers} field="users">
                    <Input placeholder={intlMapping.modalPlaceholerUsers} />
                </FormItem>
            </Form>
        </Drawer>
    )
}
export default RoleEditor
