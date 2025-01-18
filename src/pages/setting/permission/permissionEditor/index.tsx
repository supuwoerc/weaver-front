import { useTranslator } from "@/hooks/useTranslator"
import { Drawer, Form, Input, Message, Tag, Space, Spin } from "@arco-design/web-react"
import FormItem from "@arco-design/web-react/es/Form/form-item"
import { useEffect, useState } from "react"
import RoleSetting from "../../role"
import { useMutation, useQuery } from "@tanstack/react-query"
import permissionService from "@/service/permission"

interface PermissionEditorProps {
    visible: boolean
    readonly: boolean
    permissionId?: number
    onOk?: () => void
    onCancel?: () => void
}
const PermissionEditor: React.FC<PermissionEditorProps> = ({
    visible,
    readonly,
    permissionId,
    onOk,
    onCancel,
}) => {
    const intlMapping = useTranslator({
        modalTitleDetail: "permission.modal.title.detail",
        modalTitleAdd: "permission.modal.title.add",
        modalTitleEdit: "permission.modal.title.edit",
        modalLabelName: "permission.modal.label.name",
        modalPlaceholerName: "permission.modal.placeholer.name",
        modalLabelResource: "permission.modal.label.resource",
        modalPlaceholerResource: "permission.modal.placeholer.resource",
        modalLabelRoles: "permission.modal.label.roles",
        modalPlaceholerRoles: "permission.modal.placeholer.roles",
        ruleRequired: "permission.modal.rule.required",
        addSuccess: "common.add.success",
        validateError: "common.validate.error",
        warning: "common.warning",
    })
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [form] = Form.useForm()
    const upsertHandle = useMutation(permissionService.createPermission, {
        onMutate() {
            setConfirmLoading(true)
        },
        onSuccess() {
            onOk?.()
            form.clearFields()
            Message.success(intlMapping.addSuccess)
        },
        onSettled() {
            setConfirmLoading(false)
        },
    })
    const upsertConfirm = () => {
        form.validate()
            .then((val) => {
                upsertHandle.mutate(val)
            })
            .catch(() => {
                Message.warning(intlMapping.validateError)
            })
    }
    const { data, isFetching } = useQuery(
        ["permission", "detail", { id: permissionId }],
        () => {
            return permissionService.getPermisisonDetail({ id: permissionId! })
        },
        {
            enabled: visible && Boolean(permissionId),
        },
    )
    useEffect(() => {
        if (data) {
            const { name, resource } = data
            form.setFieldsValue({
                name,
                resource,
            })
        }
    }, [data, form])
    return (
        <Drawer
            width={"max(40%,500px)"}
            title={
                permissionId
                    ? readonly
                        ? intlMapping.modalTitleDetail
                        : intlMapping.modalTitleEdit
                    : intlMapping.modalTitleAdd
            }
            visible={visible}
            onOk={upsertConfirm}
            onCancel={onCancel}
            confirmLoading={confirmLoading}
        >
            <Spin loading={Boolean(permissionId) && isFetching} style={{ width: "100%" }}>
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
                            disabled={readonly}
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
                            disabled={readonly}
                            showWordLimit
                        />
                    </FormItem>
                    <FormItem label={intlMapping.modalLabelRoles} field="roles">
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <Space>
                                <Tag closable={!readonly}>Tag</Tag>
                            </Space>
                            {!readonly && visible && <RoleSetting simple />}
                        </Space>
                    </FormItem>
                </Form>
            </Spin>
        </Drawer>
    )
}
export default PermissionEditor
