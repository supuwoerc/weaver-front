import {
    Button,
    Input,
    Message,
    PaginationProps,
    Space,
    Table,
    TableColumnProps,
} from "@arco-design/web-react"
import { IconPlus } from "@arco-design/web-react/icon"
import { useEffect, useState } from "react"
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
        columnCount: "permission.table.column.role_count",
        columnCreatedAt: "permission.table.column.created_at",
        columnUpdatedAt: "permission.table.column.updated_at",
        columnOperation: "permission.table.column.operation",
        searchPlaceholer: "common.placeholer.search",
        deleteSuccess: "common.delete.success",
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
                    <Button type="primary" size="mini" onClick={() => detailHandle(item.id)}>
                        <FormattedMessage id="common.detail" />
                    </Button>
                    <Button type="primary" size="mini" onClick={() => editHandle(item.id)}>
                        <FormattedMessage id="common.edit" />
                    </Button>
                    <Button
                        type="primary"
                        status="danger"
                        size="mini"
                        onClick={() => deleteHandle.mutate({ id: item.id })}
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
        total: 96,
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
    const generateQueryKey = (patch?: GetPermissionListRequest) => {
        return [
            "setting",
            "permission",
            "list",
            {
                ...queryParams,
                ...patch,
            },
        ]
    }
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
    const handleSearch = (resetPage = false) => {
        if (resetPage) {
            setPagination(
                produce((draft) => {
                    draft.current = 1
                }),
            )
        }
        const nextQueryParams = produce(queryParams, (draft) => {
            draft.keyword = keyword
        })
        setQueryParams(nextQueryParams)
        client.invalidateQueries(generateQueryKey(nextQueryParams))
    }
    const deleteHandle = useMutation(permissionService.deletePermission, {
        onMutate() {
            setTableLoading(true)
        },
        onSuccess() {
            handleSearch(true)
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
                            onChange={setKeyword}
                            onSearch={() => handleSearch()}
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
                    handleSearch(true)
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
