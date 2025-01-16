import {
    Button,
    Form,
    Input,
    Message,
    Modal,
    Space,
    Table,
    TableColumnProps,
} from "@arco-design/web-react"
import RoleSettingContainer from "./roleContainer"
import { IconPlus } from "@arco-design/web-react/icon"
import { useMemo, useState } from "react"
import FormItem from "@arco-design/web-react/es/Form/form-item"
import { FormattedMessage, IntlShape, useIntl } from "react-intl"
import { useQuery } from "@tanstack/react-query"
import roleService from "@/service/role"
import { Grid } from "@arco-design/web-react"

const Row = Grid.Row
const Col = Grid.Col
const InputSearch = Input.Search

const getIntlMapping = (intl: IntlShape) => {
    return {
        columnId: intl.formatMessage({
            id: "role.table.column.id",
        }),
        columnName: intl.formatMessage({
            id: "role.table.column.name",
        }),
        columnOperation: intl.formatMessage({
            id: "role.table.column.operation",
        }),
        modalTitle: intl.formatMessage({
            id: "role.model.title",
        }),
        modalLabelName: intl.formatMessage({
            id: "role.model.label.name",
        }),
        modalPlaceholerName: intl.formatMessage({
            id: "role.model.placeholer.name",
        }),
        modalLabelPermission: intl.formatMessage({
            id: "role.model.label.permission",
        }),
        modalPlaceholerPermission: intl.formatMessage({
            id: "role.model.placeholer.permission",
        }),
        ruleRequired: intl.formatMessage({
            id: "role.model.rule.required",
        }),
    }
}

const RoleSetting: React.FC = () => {
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [form] = Form.useForm()
    const intl = useIntl()
    const intlMapping = useMemo(() => {
        return getIntlMapping(intl)
    }, [intl])
    const queryKey = ["setting", "role", "list"]
    const columns: TableColumnProps[] = [
        {
            title: intlMapping.columnId,
            dataIndex: "id",
        },
        {
            title: intlMapping.columnName,
            dataIndex: "name",
        },
        {
            title: intlMapping.columnOperation,
            dataIndex: "operation",
            render: () => (
                <Button type="primary" size="mini">
                    Confirm
                </Button>
            ),
        },
    ]
    const [pagination, setPagination] = useState({
        sizeCanChange: true,
        showTotal: true,
        total: 96,
        pageSize: 10,
        current: 1,
        pageSizeChangeResetCurrent: true,
    })
    const { data, isFetching } = useQuery(queryKey, () => {
        return roleService.getRoleList({
            name: "",
            limit: pagination.pageSize,
            offset: (pagination.current - 1) * pagination.pageSize,
        })
    })
    const onOk = () => {
        form.validate().then((res) => {
            setConfirmLoading(true)
            setTimeout(() => {
                Message.success("Success !")
                setVisible(false)
                setConfirmLoading(false)
            }, 1500)
        })
    }
    return (
        <RoleSettingContainer>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Row justify="space-between">
                    <Col flex={"auto"}>
                        <InputSearch
                            placeholder="Enter something"
                            style={{ width: 350, margin: 12 }}
                            searchButton={true}
                        />
                    </Col>
                    <Col flex={"0"}>
                        <Button type="primary" icon={<IconPlus />} onClick={() => setVisible(true)}>
                            <FormattedMessage id="role.btn.add" />
                        </Button>
                    </Col>
                </Row>
                <Table
                    columns={columns}
                    data={data?.list}
                    loading={isFetching}
                    pagination={pagination}
                />
            </Space>
            <Modal
                title={intlMapping.modalTitle}
                visible={visible}
                onOk={onOk}
                confirmLoading={confirmLoading}
                onCancel={() => setVisible(false)}
            >
                <Form
                    form={form}
                    labelCol={{
                        style: { flexBasis: 120 },
                    }}
                    wrapperCol={{
                        style: { flexBasis: "calc(100% - 120px)" },
                    }}
                >
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
                </Form>
            </Modal>
        </RoleSettingContainer>
    )
}
export default RoleSetting
