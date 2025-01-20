import {
    Button,
    Input,
    PaginationProps,
    Space,
    Table,
    TableColumnProps,
} from "@arco-design/web-react"
import CommonSettingContainer from "@/components/commonSettingContainer"
import { IconPlus } from "@arco-design/web-react/icon"
import { useCallback, useEffect, useMemo, useState } from "react"
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
    selectedRowKeys?: Array<number>
    onSelectedChange?: (ids: Array<number>, rows: Array<RoleListRow>) => void
}

const RoleSetting: React.FC<RoleSettingProps> = ({
    simple = false,
    selectedRowKeys = [],
    onSelectedChange,
}) => {
    const [visible, setVisible] = useState(false)
    const [tableLoading, _] = useState(false)
    const intlMapping = useTranslator({
        columnId: "role.table.column.id",
        columnName: "role.table.column.name",
        columnOperation: "role.table.column.operation",
        modalTitle: "role.modal.title",
        modalLabelName: "role.modal.label.name",
        modalPlaceholerName: "role.modal.placeholer.name",
        modalLabelPermission: "role.modal.label.permission",
        modalPlaceholerPermission: "role.modal.placeholer.permission",
        ruleRequired: "role.modal.rule.required",
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
        total: 0,
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
    const generateQueryKey = useCallback(
        (patch?: GetRoleListRequest) => {
            return [
                "setting",
                "role",
                "list",
                {
                    ...queryParams,
                    ...patch,
                },
            ]
        },
        [queryParams],
    )
    const { data, isFetching } = useQuery(generateQueryKey(), ({ queryKey }) => {
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

    const tableChangeHandle = (pagination: PaginationProps) => {
        const { current, pageSize } = pagination
        setPagination(
            produce((draft) => {
                draft.current = current
                draft.pageSize = pageSize
            }),
        )
        setQueryParams(
            produce((draft) => {
                draft.limit = pageSize!
                draft.offset = (current! - 1) * pageSize!
            }),
        )
    }
    const client = useQueryClient()
    const handleSearch = useCallback(
        (s = keyword) => {
            const nextPagination = produce(pagination, (draft) => {
                draft.current = 1
            })
            const nextQueryParams = produce(queryParams, (draft) => {
                const { current, pageSize } = nextPagination
                draft.keyword = s
                draft.offset = (current! - 1) * pageSize!
            })
            setPagination(nextPagination)
            setQueryParams(nextQueryParams)
            client.invalidateQueries(generateQueryKey(nextQueryParams))
        },
        [client, generateQueryKey, keyword, pagination, queryParams],
    )
    const keywordChangeHandle = (v: string) => {
        setKeyword(v)
        if (v == "") {
            handleSearch(v)
        }
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
                            onChange={(v) => keywordChangeHandle(v)}
                            onSearch={() => handleSearch()}
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
                    loading={isFetching || tableLoading}
                    onChange={tableChangeHandle}
                    pagination={pagination}
                    rowSelection={{
                        type: simple ? "checkbox" : undefined,
                        selectedRowKeys,
                        checkCrossPage: true,
                        preserveSelectedRowKeys: true,
                        onChange: (seletedRowKeys, seletedRows) => {
                            onSelectedChange?.(seletedRowKeys as Array<number>, seletedRows)
                        },
                    }}
                />
            </Space>
            <RoleEditor visible={visible} onCancel={() => setVisible(false)} />
        </CommonSettingContainer>
    )
}
export default RoleSetting
