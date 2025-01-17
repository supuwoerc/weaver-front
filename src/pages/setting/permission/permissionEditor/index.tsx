import { useTranslator } from "@/hooks/useTranslator"
import { Drawer, Form, Input, Select, Spin } from "@arco-design/web-react"
import FormItem from "@arco-design/web-react/es/Form/form-item"
import { useState } from "react"
import RoleSetting from "../../role"

interface PermissionEditorProps {
    visible: boolean
    roleId?: number
    onOk?: () => void
    onCancel?: () => void
}
const PermissionEditor: React.FC<PermissionEditorProps> = ({ visible, roleId, onOk, onCancel }) => {
    const intlMapping = useTranslator({
        modalTitleAdd: "permission.modal.title.add",
        modalTitleEdit: "permission.modal.title.edit",
        modalLabelName: "permission.modal.label.name",
        modalPlaceholerName: "permission.modal.placeholer.name",
        modalLabelResource: "permission.modal.label.resource",
        modalPlaceholerResource: "permission.modal.placeholer.resource",
        modalLabelRoles: "permission.modal.label.roles",
        modalPlaceholerRoles: "permission.modal.placeholer.roles",
        ruleRequired: "permission.modal.rule.required",
    })
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [form] = Form.useForm()
    return (
        <Drawer
            width={"max(50%,500px)"}
            title={roleId ? intlMapping.modalTitleEdit : intlMapping.modalTitleAdd}
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
                    <Input
                        placeholder={intlMapping.modalPlaceholerName}
                        maxLength={20}
                        showWordLimit
                    />
                </FormItem>
                <FormItem
                    label={intlMapping.modalLabelResource}
                    field="resource"
                    rules={[
                        {
                            required: true,
                            message: intlMapping.ruleRequired,
                        },
                    ]}
                >
                    <Input
                        placeholder={intlMapping.modalPlaceholerResource}
                        maxLength={255}
                        showWordLimit
                    />
                </FormItem>
                <FormItem label={intlMapping.modalLabelRoles} field="roles">
                    <RoleSetting simple />
                </FormItem>
            </Form>
        </Drawer>
    )
}
export default PermissionEditor
