import { useTranslator } from "@/hooks/useTranslator"
import {
    Drawer,
    Form,
    Input,
    Message,
    Tag,
    Space,
    Spin,
    Empty,
    Alert,
} from "@arco-design/web-react"
import FormItem from "@arco-design/web-react/es/Form/form-item"
import { useEffect, useState } from "react"
import RoleSetting from "../../role"
import { useMutation, useQuery } from "@tanstack/react-query"
import permissionService, {
    CreatePermissionRequest,
    PermissionDetail,
    UpdatePermissionRequest,
} from "@/service/permission"
import { RoleListRow } from "@/service/role"
import { FormattedMessage } from "react-intl"

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
        updateSuccess: "common.update.success",
        validateError: "common.validate.error",
        warning: "common.warning",
    })
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [form] = Form.useForm<CreatePermissionRequest | UpdatePermissionRequest>()
    const upsertHandle = useMutation(
        (params: CreatePermissionRequest | UpdatePermissionRequest) => {
            if ("id" in params) {
                return permissionService.updatePermission(params)
            }
            return permissionService.createPermission(params)
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
    const { data, isFetching } = useQuery<PermissionDetail>(
        ["permission", "detail", { id: permissionId }],
        () => {
            return permissionService.getPermisisonDetail({ id: permissionId! })
        },
        {
            enabled: visible && Boolean(permissionId),
        },
    )
    const [roles, setRoles] = useState<Array<any>>(data?.roles ?? [])
    useEffect(() => {
        if (data) {
            const { name, resource, roles } = data
            form.setFieldsValue({
                name,
                resource,
                roles: roles.map((item) => item.id),
            })
            setRoles(roles)
        } else {
            form.setFieldsValue({
                roles: [],
            })
            setRoles([])
        }
    }, [data, form, visible])
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
            onCancel={() => {
                form.resetFields()
                onCancel?.()
                setRoles([])
            }}
            confirmLoading={confirmLoading}
            footer={readonly ? null : undefined}
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
                            readOnly={readonly}
                            showWordLimit={!readonly}
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
                            readOnly={readonly}
                            showWordLimit={!readonly}
                        />
                    </FormItem>
                    {!isFetching && (
                        <FormItem label={intlMapping.modalLabelRoles} field="roles">
                            <CustomRoleSelector
                                readonly={readonly}
                                visible={visible}
                                roles={roles}
                                onRolesChange={(val) => setRoles(val)}
                            />
                        </FormItem>
                    )}
                </Form>
            </Spin>
        </Drawer>
    )
}

interface RoleSelectorProps {
    readonly: boolean
    visible: boolean
    roles?: Array<any> // FIXME:类型完善
    value?: Array<number>
    onChange?: (val: Array<number>) => void
    onRolesChange: (val: Array<RoleListRow>) => void
}

const CustomRoleSelector: React.FC<RoleSelectorProps> = ({
    readonly,
    visible,
    roles = [],
    value,
    onChange,
    onRolesChange,
}) => {
    const tabCloseHandle = (roleId: number) => {
        const ids = value?.filter((id) => {
            return id != roleId
        })
        onChange?.(ids ?? [])
        const r = roles.filter((item) => {
            return item.id != roleId
        })
        onRolesChange(r)
    }
    const onSelectedChangeHandle = (ids: Array<number>, rows: Array<any>) => {
        onChange?.(ids)
        const temp = roles?.filter((item) => {
            return ids.includes(item.id)
        })
        const tempIds = temp?.map((item) => item.id)
        rows.forEach((item) => {
            if (!tempIds.includes(item.id)) {
                temp.push(item)
            }
        })
        onRolesChange(temp)
    }
    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            {roles.length > 0 ? (
                <Space wrap>
                    {roles.map((item) => {
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
                    content={<FormattedMessage id="permission.modal.placeholer.roles" />}
                />
            )}
            {visible && !readonly && (
                <RoleSetting
                    simple
                    selectedRowKeys={value}
                    onSelectedChange={onSelectedChangeHandle}
                />
            )}
        </Space>
    )
}

export default PermissionEditor
