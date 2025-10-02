import {
    Button,
    Input,
    Link,
    Message,
    Modal,
    PaginationProps,
    Space,
    Table,
    TableColumnProps,
} from "@arco-design/web-react"
import CommonSettingContainer from "@/components/common-setting-container"
import { IconPlus } from "@arco-design/web-react/icon"
import { useCallback, useEffect, useMemo, useState } from "react"
import { FormattedMessage } from "react-intl"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import roleService, { GetRoleListRequest, RoleListRow } from "@/service/role"
import { Grid } from "@arco-design/web-react"
import { produce } from "immer"
import { useTranslator } from "@/hooks/use-translator"
import RoleEditor from "./role-editor"
import UserColumn from "@/components/user-column"

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
    const [tableLoading, setTableLoading] = useState(false)
    const [readonly, setReadonly] = useState(false)
    const [roleId, setRoleId] = useState<number>()
    const intlMapping = useTranslator({
        columnName: "role.table.column.name",
        columnCreatedAt: "common.table.created_at",
        columnUpdatedAt: "common.table.updated_at",
        columnOperation: "common.table.operation",
        searchPlaceholer: "common.placeholer.search",
        deleteSuccess: "common.delete.success",
        tips: "common.tips",
        deleteTips: "common.delete.tips",
        columnOperator: "common.table.operator",
    })
    const deleteHandle = useMutation({
        mutationFn: roleService.deleteRole,
        onMutate() {
            setTableLoading(true)
        },
        onSuccess() {
            searchHandle()
            Message.success(intlMapping.deleteSuccess)
        },
        onSettled() {
            setTableLoading(false)
        },
    })
    const detailHandle = (id: number) => {
        setRoleId(id)
        setReadonly(true)
        setVisible(true)
    }
    const columns = useMemo<TableColumnProps<RoleListRow>[]>(() => {
        const result: TableColumnProps<RoleListRow>[] = [
            {
                title: intlMapping.columnName,
                dataIndex: "name",
                ellipsis: true,
            },
            {
                title: intlMapping.columnCreatedAt,
                dataIndex: "created_at",
                ellipsis: true,
            },
        ]
        if (!simple) {
            result.push(
                {
                    title: intlMapping.columnOperator,
                    dataIndex: "updater",
                    render: (_, item) => {
                        return <UserColumn {...item.updater} />
                    },
                },
                {
                    title: intlMapping.columnUpdatedAt,
                    dataIndex: "updated_at",
                    ellipsis: true,
                },
                {
                    title: intlMapping.columnOperation,
                    dataIndex: "operation",
                    width: 150,
                    render: (_, item: RoleListRow) => (
                        <Space>
                            <Link hoverable={false} onClick={() => detailHandle(item.id)}>
                                <FormattedMessage id="common.detail" />
                            </Link>
                            <Link
                                hoverable={false}
                                status={item.children?.length ? "warning" : "error"}
                                onClick={() =>
                                    Modal.confirm({
                                        title: intlMapping.tips,
                                        content: intlMapping.deleteTips,
                                        okButtonProps: {
                                            status: "danger",
                                        },
                                        onOk: () => {
                                            return deleteHandle.mutateAsync({ id: item.id })
                                        },
                                    })
                                }
                            >
                                <FormattedMessage id="common.delete" />
                            </Link>
                        </Space>
                    ),
                },
            )
        }
        return result
    }, [simple, intlMapping, deleteHandle])
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
                } as GetRoleListRequest,
            ] as const
        },
        [queryParams],
    )
    const { data, isFetching } = useQuery({
        queryKey: generateQueryKey(),
        queryFn: ({ queryKey }) => {
            return roleService.getRoleList(queryKey[3])
        },
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
    const searchHandle = useCallback(
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
            client.invalidateQueries({ queryKey: generateQueryKey(nextQueryParams) })
        },
        [client, generateQueryKey, keyword, pagination, queryParams],
    )
    const keywordChangeHandle = (v: string) => {
        setKeyword(v)
        if (v == "") {
            searchHandle(v)
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
                            onSearch={() => searchHandle()}
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
                <Table<RoleListRow>
                    rowKey={"id"}
                    columns={columns}
                    data={data?.list}
                    loading={{
                        loading: isFetching || tableLoading,
                    }}
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
            {!simple && (
                <RoleEditor
                    visible={visible}
                    readonly={readonly}
                    roleId={roleId}
                    onOk={() => {
                        setRoleId(undefined)
                        setReadonly(false)
                        setVisible(false)
                        searchHandle()
                    }}
                    onCancel={() => {
                        setRoleId(undefined)
                        setReadonly(false)
                        setVisible(false)
                    }}
                    onEdit={() => {
                        setReadonly(false)
                    }}
                />
            )}
        </CommonSettingContainer>
    )
}
export default RoleSetting
