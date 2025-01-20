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
            onSuccess(data, variables) {
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
            const { id, name, resource, roles } = data
            form.setFieldsValue({
                id,
                name,
                resource,
                roles: roles.map((item) => item.id),
            })
            setRoles(roles)
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
                    {!isFetching && (
                        <FormItem label={intlMapping.modalLabelRoles} field="roles">
                            <CustomRoleSelector
                                readonly={readonly}
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
    roles?: Array<any> // FIXME:类型完善
    value?: Array<number>
    onChange?: (val: Array<number>) => void
    onRolesChange: (val: Array<RoleListRow>) => void
}

const CustomRoleSelector: React.FC<RoleSelectorProps> = ({
    readonly,
    roles = [],
    value,
    onChange,
    onRolesChange,
}) => {
    const tabCloseHandle = (e: any) => {
        const ids = value?.filter((id) => {
            return id != e.detail
        })
        onChange?.(ids ?? [])
        const r = roles.filter((item) => {
            return item.id != e.detail
        })
        onRolesChange(r)
    }
    const onSelectedChangeHandle = (ids: Array<number>, rows: Array<any>) => {
        onChange?.(ids)
        onRolesChange(rows)
    }
    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            {roles.length > 0 ? (
                <Space>
                    {roles.map((item) => {
                        return (
                            <Tag
                                closable={!readonly}
                                key={item.id}
                                color="arcoblue"
                                onClose={tabCloseHandle}
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
            {!readonly && (
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
