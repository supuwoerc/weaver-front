import {
    Button,
    Input,
    Message,
    Modal,
    PaginationProps,
    Space,
    Table,
    TableColumnProps,
} from "@arco-design/web-react"
import { IconPlus } from "@arco-design/web-react/icon"
import { useCallback, useEffect, useState } from "react"
import { FormattedMessage } from "react-intl"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Grid } from "@arco-design/web-react"
import { produce } from "immer"
import { getArrayItem } from "@supuwoerc/utils"
import { useTranslator } from "@/hooks/useTranslator"
import CommonSettingContainer from "@/components/commonSettingContainer"
import PermissionEditor from "./permissionEditor"
import permissionService, {
    GetPermissionListRequest,
    PermissionListRow,
} from "@/service/permission"

const Row = Grid.Row
const Col = Grid.Col
const InputSearch = Input.Search

const PermissionSetting: React.FC = () => {
    const [visible, setVisible] = useState(false)
    const [tableLoading, setTableLoading] = useState(false)
    const [readonly, setReadonly] = useState(false)
    const [permissionId, setPermissionId] = useState<number>()
    const intlMapping = useTranslator({
        columnId: "permission.table.column.id",
        columnName: "permission.table.column.name",
        columnResource: "permission.table.column.resource",
        columnCreatedAt: "permission.table.column.created_at",
        columnUpdatedAt: "permission.table.column.updated_at",
        columnOperation: "permission.table.column.operation",
        searchPlaceholer: "common.placeholer.search",
        deleteSuccess: "common.delete.success",
        tips: "common.tips",
        deleteTips: "common.delete.tips",
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
            title: intlMapping.columnResource,
            dataIndex: "resource",
        },
        {
            title: intlMapping.columnCreatedAt,
            dataIndex: "created_at",
        },
        {
            title: intlMapping.columnUpdatedAt,
            dataIndex: "updated_at",
        },
        {
            title: intlMapping.columnOperation,
            dataIndex: "operation",
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
                        shape="round"
                        size="mini"
                        onClick={() => editHandle(item.id)}
                    >
                        <FormattedMessage id="common.edit" />
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
    ]
    const detailHandle = (id: number) => {
        setPermissionId(id)
        setReadonly(true)
        setVisible(true)
    }
    const editHandle = (id: number) => {
        setPermissionId(id)
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
                },
            ]
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
    const { data, isFetching } = useQuery(queryKey, ({ queryKey }) => {
        const params = getArrayItem(queryKey, -1) as GetPermissionListRequest
        return permissionService.getPermissionList(params)
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
    const deleteHandle = useMutation(permissionService.deletePermission, {
        onMutate() {
            setTableLoading(true)
        },
        onSuccess() {
            handleSearch()
            Message.success(intlMapping.deleteSuccess)
        },
        onSettled() {
            setTableLoading(false)
        },
    })
    return (
        <CommonSettingContainer>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Row justify="space-between">
                    <Col flex={"auto"}>
                        <InputSearch
                            placeholder={intlMapping.searchPlaceholer}
                            style={{ width: 350, margin: 0 }}
                            value={keyword}
                            onSearch={() => handleSearch()}
                            onChange={(v) => keywordChangeHandle(v)}
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
                    rowKey={"id"}
                    loading={isFetching || tableLoading}
                    pagination={pagination}
                    onChange={tableChangeHandle}
                />
            </Space>
            <PermissionEditor
                visible={visible}
                readonly={readonly}
                permissionId={permissionId}
                onOk={() => {
                    setPermissionId(undefined)
                    setReadonly(false)
                    setVisible(false)
                    handleSearch()
                }}
                onCancel={() => {
                    setPermissionId(undefined)
                    setReadonly(false)
                    setVisible(false)
                }}
            />
        </CommonSettingContainer>
    )
}
export default PermissionSetting
