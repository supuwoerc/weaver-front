import {
    Button,
    Form,
    Input,
    PaginationProps,
    Space,
    Table,
    TableColumnProps,
} from "@arco-design/web-react"
import CommonSettingContainer from "@/components/commonSettingContainer"
import { IconPlus } from "@arco-design/web-react/icon"
import { useEffect, useMemo, useState } from "react"
import { FormattedMessage } from "react-intl"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import roleService, { GetRoleListRequest, RoleListRow } from "@/service/role"
import { Grid } from "@arco-design/web-react"
import { produce } from "immer"
import { getArrayItem } from "@supuwoerc/utils"
import { useTranslator } from "@/hooks/useTranslator"
import RoleEditor from "./roleEditor"

const Row = Grid.Row
const Col = Grid.Col
const InputSearch = Input.Search

export interface RoleSettingProps {
    simple?: boolean
    initialCheckedIds?: Array<number>
}

const RoleSetting: React.FC<RoleSettingProps> = ({ simple = false, initialCheckedIds = [] }) => {
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const [selectedRows, setSelectedRows] = useState<Array<RoleListRow>>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<Array<number>>(initialCheckedIds)
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
        searchPlaceholer: "common.placeholer.search",
    })
    const columns = useMemo<TableColumnProps[]>(() => {
        const result: TableColumnProps[] = [
            {
                title: intlMapping.columnId,
                dataIndex: "id",
            },
            {
                title: intlMapping.columnName,
                dataIndex: "name",
            },
        ]
        if (!simple) {
            result.push({
                title: intlMapping.columnOperation,
                dataIndex: "operation",
                render: () => (
                    <Button type="primary" size="mini">
                        Confirm
                    </Button>
                ),
            })
        }
        return result
    }, [simple, intlMapping])

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
            // console.log(res)
            return res
        })
    }
    return (
        <CommonSettingContainer noPadding={simple}>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Row justify="space-between">
                    <Col flex={"auto"}>
                        <InputSearch
                            placeholder={intlMapping.searchPlaceholer}
                            style={{ width: simple ? "100%" : 350, margin: 0 }}
                            value={keyword}
                            onChange={setKeyword}
                            onSearch={handleSearch}
                            allowClear
                            searchButton={true}
                        />
                    </Col>
                    {!simple && (
                        <Col flex={"0"}>
                            <Button
                                type="primary"
                                icon={<IconPlus />}
                                onClick={() => setVisible(true)}
                            >
                                <FormattedMessage id="role.btn.add" />
                            </Button>
                        </Col>
                    )}
                </Row>
                <Table
                    rowKey={"id"}
                    columns={columns}
                    data={data?.list}
                    loading={isFetching}
                    pagination={pagination}
                    rowSelection={{
                        type: simple ? "checkbox" : undefined,
                        selectedRowKeys,
                        onChange: (seletedRowKeys, selectedRows) => {
                            setSelectedRowKeys(seletedRowKeys as Array<number>)
                            setSelectedRows(selectedRows)
                        },
                    }}
                />
            </Space>
            <RoleEditor visible={visible} onCancel={() => setVisible(false)} />
        </CommonSettingContainer>
    )
}
export default RoleSetting
