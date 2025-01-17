import {
    Button,
    Form,
    Input,
    PaginationProps,
    Space,
    Table,
    TableColumnProps,
} from "@arco-design/web-react"
import { IconPlus } from "@arco-design/web-react/icon"
import { useEffect, useState } from "react"
import { FormattedMessage } from "react-intl"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import roleService, { GetRoleListRequest } from "@/service/role"
import { Grid } from "@arco-design/web-react"
import { produce } from "immer"
import { getArrayItem } from "@supuwoerc/utils"
import { useTranslator } from "@/hooks/useTranslator"
import CommonSettingContainer from "@/components/commonSettingContainer"
import PermissionEditor from "./permissionEditor"

const Row = Grid.Row
const Col = Grid.Col
const InputSearch = Input.Search

const PermissionSetting: React.FC = () => {
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const intlMapping = useTranslator({
        columnId: "permission.table.column.id",
        columnName: "permission.table.column.name",
        columnResource: "permission.table.column.resource",
        columnCount: "permission.table.column.role_count",
        columnCreatedAt: "permission.table.column.created_at",
        columnUpdatedAt: "permission.table.column.updated_at",
        columnOperation: "permission.table.column.operation",
        searchPlaceholer: "common.placeholer.search",
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
                    Custom
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
        keyword: keyword,
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
            draft.keyword = keyword
        })
        setQueryParams(nextQueryParams)
        client.invalidateQueries(generateQueryKey(nextQueryParams))
    }
    const onOk = () => {
        form.validate().then((res) => {
            return res
            // console.log(res)
        })
    }
    return (
        <CommonSettingContainer>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Row justify="space-between">
                    <Col flex={"auto"}>
                        <InputSearch
                            placeholder={intlMapping.searchPlaceholer}
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
                            <FormattedMessage id="permission.btn.add" />
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
            <PermissionEditor visible={visible} onCancel={() => setVisible(false)} />
        </CommonSettingContainer>
    )
}
export default PermissionSetting
