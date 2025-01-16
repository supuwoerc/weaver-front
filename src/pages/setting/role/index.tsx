import {
    Button,
    Form,
    Input,
    Message,
    Modal,
    PaginationProps,
    Space,
    Table,
    TableColumnProps,
} from "@arco-design/web-react"
import RoleSettingContainer from "./roleContainer"
import { IconPlus } from "@arco-design/web-react/icon"
import { useEffect, useState } from "react"
import FormItem from "@arco-design/web-react/es/Form/form-item"
import { FormattedMessage } from "react-intl"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import roleService, { GetRoleListRequest } from "@/service/role"
import { Grid } from "@arco-design/web-react"
import { produce } from "immer"
import { getArrayItem } from "@supuwoerc/utils"
import { useTranslator } from "@/hooks/useTranslator"

const Row = Grid.Row
const Col = Grid.Col
const InputSearch = Input.Search

const RoleSetting: React.FC = () => {
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [form] = Form.useForm()
    const intlMapping = useTranslator({
        columnId: "role.table.column.id",
        columnName: "role.table.column.name",
        columnOperation: "role.table.column.operation",
        modalTitle: "role.model.title",
        modalLabelName: "role.model.label.name",
        modalPlaceholerName: "role.model.placeholer.name",
        modalLabelPermission: "role.model.label.permission",
        modalPlaceholerPermission: "role.model.placeholer.permission",
        ruleRequired: "role.model.rule.required",
    })
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
    const [pagination, setPagination] = useState<PaginationProps>({
        sizeCanChange: true,
        showTotal: true,
        total: 96,
        pageSize: 10,
        current: 1,
        pageSizeChangeResetCurrent: true,
    })
    const [keyword, setKeyword] = useState<string>("")
    const { current, pageSize } = pagination
    const [queryParams, setQueryParams] = useState<GetRoleListRequest>({
        name: keyword,
        limit: pageSize!,
        offset: (current! - 1) * pageSize!,
    })
    const generateQueryKey = (patch?: GetRoleListRequest) => {
        return [
            "setting",
            "role",
            "list",
            {
                ...queryParams,
                ...patch,
            },
        ]
    }
    const queryKey = generateQueryKey()
    const { data, isFetching } = useQuery(queryKey, ({ queryKey }) => {
        const params = getArrayItem(queryKey, -1) as GetRoleListRequest
        return roleService.getRoleList(params)
    })
    useEffect(() => {
        if (data) {
            setPagination(
                produce((draft) => {
                    draft.total = data.total ?? 0
                }),
            )
        }
    }, [data])
    const client = useQueryClient()
    const handleSearch = () => {
        const nextQueryParams = produce(queryParams, (draft) => {
            draft.name = keyword
        })
        setQueryParams(nextQueryParams)
        client.invalidateQueries(generateQueryKey(nextQueryParams))
    }
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
                            style={{ width: 350, margin: 0 }}
                            value={keyword}
                            onChange={setKeyword}
                            onSearch={handleSearch}
                            allowClear
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
