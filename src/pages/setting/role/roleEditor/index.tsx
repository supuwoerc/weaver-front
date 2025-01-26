import { useTranslator } from "@/hooks/useTranslator"
import { CreateRoleRequest, RoleDetail, UpdateRoleRequest } from "@/service/role"
import { Drawer, Form, Input, Message, Spin } from "@arco-design/web-react"
import FormItem from "@arco-design/web-react/es/Form/form-item"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import roleService from "@/service/role"

interface RoleEditorProps {
    visible: boolean
    readonly: boolean
    roleId?: number
    onOk?: () => void
    onCancel?: () => void
}
const RoleEditor: React.FC<RoleEditorProps> = ({ visible, readonly, roleId, onOk, onCancel }) => {
    const intlMapping = useTranslator({
        modalTitleDetail: "role.modal.title.detail",
        modalTitleAdd: "role.modal.title.add",
        modalTitleEdit: "role.modal.title.edit",
        modalLabelName: "role.modal.label.name",
        modalPlaceholerName: "role.modal.placeholer.name",
        modalLabelPermission: "role.modal.label.permission",
        modalLabelUsers: "role.modal.label.users",
        modalPlaceholerPermission: "role.modal.placeholer.permission",
        modalPlaceholerUsers: "role.modal.placeholer.users",
        ruleRequired: "role.modal.rule.required",
        addSuccess: "common.add.success",
        updateSuccess: "common.update.success",
        validateError: "common.validate.error",
        warning: "common.warning",
    })
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [form] = Form.useForm()
    const upsertHandle = useMutation(
        (params: CreateRoleRequest | UpdateRoleRequest) => {
            if ("id" in params) {
                return roleService.updateRole(params)
            }
            return roleService.createRole(params)
        },
        {
            onMutate() {
                setConfirmLoading(true)
            },
            onSuccess(_, variables) {
                onOk?.()
                form.clearFields()
                if ("id" in variables) {
                    Message.success(intlMapping.updateSuccess)
                } else {
                    Message.success(intlMapping.addSuccess)
                }
            },
            onSettled() {
                setConfirmLoading(false)
            },
        },
    )
    const { data, isFetching } = useQuery<RoleDetail>(
        ["role", "detail", { id: roleId }],
        () => {
            return roleService.getRoleDetail({ id: roleId! })
        },
        {
            enabled: visible && Boolean(roleId),
        },
    )
    const [_, setPermissions] = useState<Array<any>>(data?.permissions ?? []) //FIXME:类型修复
    useEffect(() => {
        if (data) {
            const { name, users, permissions } = data
            form.setFieldsValue({
                name,
                users,
                roles: permissions.map((item) => item.id),
            })
            setPermissions(permissions)
        } else {
            form.setFieldsValue({
                roles: [],
            })
            setPermissions([])
        }
    }, [data, form, visible])
    const upsertConfirm = () => {
        form.validate()
            .then((val) => {
                upsertHandle.mutate({
                    ...val,
                    ...(data ? { id: data?.id } : null),
                })
            })
            .catch(() => {
                Message.warning(intlMapping.validateError)
            })
    }
    return (
        <Drawer
            width={"max(40%,500px)"}
            title={
                roleId
                    ? readonly
                        ? intlMapping.modalTitleDetail
                        : intlMapping.modalTitleEdit
                    : intlMapping.modalTitleAdd
            }
            visible={visible}
            onOk={upsertConfirm}
            onCancel={() => {
                form.resetFields()
                onCancel?.()
                // setRoles([])
            }}
            confirmLoading={confirmLoading}
            footer={readonly ? null : undefined}
        >
            <Spin loading={Boolean(roleId) && isFetching} style={{ width: "100%" }}>
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
                    <FormItem label={intlMapping.modalLabelUsers} field="users">
                        <Input placeholder={intlMapping.modalPlaceholerUsers} />
                    </FormItem>
                    <FormItem label={intlMapping.modalLabelPermission} field="permissions">
                        <Input placeholder={intlMapping.modalPlaceholerPermission} />
                    </FormItem>
                </Form>
            </Spin>
        </Drawer>
    )
}
export default RoleEditor
