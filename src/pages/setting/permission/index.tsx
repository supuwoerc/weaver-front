import {
    Button,
    Input,
    Message,
    Modal,
    PaginationProps,
    Space,
    Table,
    TableColumnProps,
    Tag,
} from "@arco-design/web-react"
import { IconPlus } from "@arco-design/web-react/icon"
import { useCallback, useEffect, useMemo, useState } from "react"
import { FormattedMessage } from "react-intl"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Grid } from "@arco-design/web-react"
import { produce } from "immer"
import { useTranslator } from "@/hooks/use-translator"
import CommonSettingContainer from "@/components/common-setting-container"
import PermissionEditor from "./permission-editor"
import permissionService, {
    GetPermissionListRequest,
    PermissionListRow,
} from "@/service/permission"
import UserColumn from "@/components/user-column"
import { ResourceTypeOptions } from "@/constant/permission"

const Row = Grid.Row
const Col = Grid.Col
const InputSearch = Input.Search

export interface PermissionSettingProps {
    simple?: boolean
    selectedRowKeys?: Array<number>
    onSelectedChange?: (ids: Array<number>, rows: Array<PermissionListRow>) => void
}

const PermissionSetting: React.FC<PermissionSettingProps> = ({
    simple,
    selectedRowKeys = [],
    onSelectedChange,
}) => {
    const [visible, setVisible] = useState(false)
    const [tableLoading, setTableLoading] = useState(false)
    const [readonly, setReadonly] = useState(false)
    const [permissionId, setPermissionId] = useState<number>()
    const intlMapping = useTranslator({
        columnName: "permission.table.column.name",
        columnResource: "permission.table.column.resource",
        columnType: "permission.table.column.type",
        columnOperator: "common.table.operator",
        columnUpdatedAt: "common.table.updated_at",
        columnOperation: "common.table.operation",
        searchPlaceholer: "common.placeholer.search",
        deleteSuccess: "common.delete.success",
        tips: "common.tips",
        deleteTips: "common.delete.tips",
    })
    const deleteHandle = useMutation({
        mutationFn: permissionService.deletePermission,
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
    const columns = useMemo<TableColumnProps<PermissionListRow>[]>(() => {
        const result: TableColumnProps<PermissionListRow>[] = [
            {
                title: intlMapping.columnName,
                dataIndex: "name",
                ellipsis: true,
            },
            {
                title: intlMapping.columnResource,
                dataIndex: "resource",
                ellipsis: true,
            },
            {
                title: intlMapping.columnType,
                dataIndex: "type",
                ellipsis: true,
                render: (_, item) => {
                    const o = ResourceTypeOptions.find((option) => {
                        return option.value == item.type
                    })
                    if (o) {
                        return (
                            <Tag color="arcoblue">
                                <FormattedMessage id={o.label} />
                            </Tag>
                        )
                    }
                    return "-"
                },
            },
        ]
        if (!simple) {
            result.push(
                {
                    title: intlMapping.columnOperator,
                    dataIndex: "updater",
                    ellipsis: true,
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
                    render: (_, item: PermissionListRow) => (
                        <Space>
                            <Button
                                type="primary"
                                shape="round"
                                size="mini"
                                onClick={() => detailHandle(item.id)}
                            >
                                <FormattedMessage id="common.detail" />
                            </Button>
                            <Button
                                type="outline"
                                status="danger"
                                shape="round"
                                size="mini"
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
                            </Button>
                        </Space>
                    ),
                },
            )
        }
        return result
    }, [simple, intlMapping, deleteHandle])
    const detailHandle = (id: number) => {
        setPermissionId(id)
        setReadonly(true)
        setVisible(true)
    }
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
    const [queryParams, setQueryParams] = useState<GetPermissionListRequest>({
        keyword: keyword,
        limit: pageSize!,
        offset: (current! - 1) * pageSize!,
    })
    const generateQueryKey = useCallback(
        (patch?: GetPermissionListRequest) => {
            return [
                "setting",
                "permission",
                "list",
                {
                    ...queryParams,
                    ...patch,
                } as GetPermissionListRequest,
            ] as const
        },
        [queryParams],
    )
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
    const queryKey = generateQueryKey()
    const { data, isFetching } = useQuery({
        queryKey,
        queryFn: ({ queryKey }) => {
            return permissionService.getPermissionList(queryKey[3])
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
            client.invalidateQueries({
                queryKey: generateQueryKey(nextQueryParams),
            })
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
                            onSearch={() => searchHandle()}
                            onChange={(v) => keywordChangeHandle(v)}
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
                                <FormattedMessage id="permission.btn.add" />
                            </Button>
                        </Col>
                    )}
                </Row>
                <Table<PermissionListRow>
                    columns={columns}
                    data={data?.list}
                    rowKey={"id"}
                    loading={{
                        loading: isFetching || tableLoading,
                    }}
                    pagination={pagination}
                    onChange={tableChangeHandle}
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
                <PermissionEditor
                    visible={visible}
                    readonly={readonly}
                    permissionId={permissionId}
                    onEdit={() => {
                        setReadonly(false)
                    }}
                    onOk={() => {
                        setPermissionId(undefined)
                        setReadonly(false)
                        setVisible(false)
                        searchHandle()
                    }}
                    onCancel={() => {
                        setPermissionId(undefined)
                        setReadonly(false)
                        setVisible(false)
                    }}
                />
            )}
        </CommonSettingContainer>
    )
}
export default PermissionSetting
