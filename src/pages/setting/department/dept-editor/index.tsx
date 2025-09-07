import { useTranslator } from "@/hooks/use-translator"
import {
    CreateRoleRequest,
    RoleDetail,
    RoleDetailPermission,
    UpdateRoleRequest,
} from "@/service/role"
import {
    Alert,
    Drawer,
    Empty,
    Form,
    Input,
    Message,
    Space,
    Spin,
    Tag,
} from "@arco-design/web-react"
import FormItem from "@arco-design/web-react/es/Form/form-item"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import roleService from "@/service/role"
import { FormattedMessage } from "react-intl"
import PermissionSetting from "../../permission"

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

    const { data, isFetching } = useQuery<RoleDetail>({
        queryKey: ["role", "detail", { id: roleId }],
        queryFn: () => {
            return roleService.getRoleDetail({ id: roleId! })
        },
        enabled: visible && Boolean(roleId),
    })

    const [permissions, setPermissions] = useState<RoleDetailPermission[]>(data?.permissions ?? [])
    useEffect(() => {
        if (data) {
            const { name, users, permissions } = data
            form.setFieldsValue({
                name,
                users: users.map((item) => item.id),
                permissions: permissions.map((item) => item.id),
            })
            setPermissions(permissions)
        } else {
            form.setFieldsValue({
                permissions: [],
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
                setPermissions([])
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
                        <Input
                            placeholder={intlMapping.modalPlaceholerName}
                            readOnly={readonly}
                            maxLength={20}
                            showWordLimit={!readonly}
                        />
                    </FormItem>
                    <FormItem label={intlMapping.modalLabelUsers} field="users">
                        {/* <Input placeholder={intlMapping.modalPlaceholerUsers} /> */}
                        <span>TODO</span>
                    </FormItem>
                    {!isFetching && (
                        <FormItem label={intlMapping.modalLabelPermission} field="permissions">
                            <CustomPermissionSelector
                                readonly={readonly}
                                visible={visible}
                                permissions={permissions}
                                onPermissionChange={(val) => setPermissions(val)}
                            />
                        </FormItem>
                    )}
                </Form>
            </Spin>
        </Drawer>
    )
}

interface PermissionSelectorProps {
    readonly: boolean
    visible: boolean
    permissions: Array<any>
    value?: Array<number>
    onChange?: (val: Array<number>) => void
    onPermissionChange: (val: Array<any>) => void
}

const CustomPermissionSelector: React.FC<PermissionSelectorProps> = ({
    readonly,
    visible,
    permissions = [],
    value,
    onChange,
    onPermissionChange,
}) => {
    const tabCloseHandle = (roleId: number) => {
        const ids = value?.filter((id) => {
            return id != roleId
        })
        onChange?.(ids ?? [])
        const r = permissions.filter((item) => {
            return item.id != roleId
        })
        onPermissionChange(r)
    }
    const onSelectedChangeHandle = (ids: Array<number>, rows: Array<any>) => {
        onChange?.(ids)
        const temp = permissions?.filter((item) => {
            return ids.includes(item.id)
        })
        const tempIds = temp?.map((item) => item.id)
        rows.forEach((item) => {
            if (!tempIds.includes(item.id)) {
                temp.push(item)
            }
        })
        onPermissionChange(temp)
    }
    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            {permissions.length > 0 ? (
                <Space wrap>
                    {permissions.map((item) => {
                        return (
                            <Tag
                                closable={!readonly}
                                key={item.id}
                                color="arcoblue"
                                onClose={() => tabCloseHandle(item.id)}
                            >
                                {item.name}
                            </Tag>
                        )
                    })}
                </Space>
            ) : readonly ? (
                <Empty />
            ) : (
                <Alert
                    type="warning"
                    content={<FormattedMessage id="role.modal.placeholer.permission" />}
                />
            )}
            {visible && !readonly && (
                <PermissionSetting
                    simple
                    selectedRowKeys={value}
                    onSelectedChange={onSelectedChangeHandle}
                />
            )}
        </Space>
    )
}

export default RoleEditor
