import {
    Avatar,
    Button,
    Input,
    PaginationProps,
    Space,
    Table,
    TableColumnProps,
    Tag,
} from "@arco-design/web-react"
import { parseAsString, useQueryState } from "nuqs"
import CommonSettingContainer from "@/components/common-setting-container"
import { useCallback, useEffect, useMemo, useState } from "react"
import { FormattedMessage } from "react-intl"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Grid } from "@arco-design/web-react"
import { produce } from "immer"
import { getArrayItem } from "@supuwoerc/utils"
import { useTranslator } from "@/hooks/use-translator"
import UserEditor from "./user-editor"
import userService, { GetUserListRequest, UserListRow } from "@/service/user"
import { emptyPlaceholder } from "@/constant/system"

const Row = Grid.Row
const Col = Grid.Col
const InputSearch = Input.Search

export interface UserSettingProps {}

const UserSetting: React.FC<UserSettingProps> = () => {
    const [visible, setVisible] = useState(false)
    const [readonly, setReadonly] = useState(false)
    const [userId, setUserId] = useState<number>()
    const intlMapping = useTranslator({
        columnAvatar: "user.table.column.avatar",
        columnName: "user.table.column.name",
        columnEmail: "user.table.column.email",
        columnRoles: "user.table.column.roles",
        columnDept: "user.table.column.dept",
        columnOperation: "common.table.operation",
        searchPlaceholer: "common.placeholer.search",
    })
    const detailHandle = (id: number) => {
        setUserId(id)
        setReadonly(true)
        setVisible(true)
    }
    const editHandle = (id: number) => {
        setUserId(id)
        setVisible(true)
    }
    const columns = useMemo<TableColumnProps<UserListRow>[]>(() => {
        const result: TableColumnProps<UserListRow>[] = [
            {
                title: intlMapping.columnAvatar,
                dataIndex: "avatar",
                render: (col) => {
                    if (col) {
                        return (
                            <Avatar>
                                <img alt="avatar" src={col} />
                            </Avatar>
                        )
                    }
                    return emptyPlaceholder
                },
            },
            {
                title: intlMapping.columnName,
                dataIndex: "nickname",
                render: (col) => {
                    return col || emptyPlaceholder
                },
            },
            {
                title: intlMapping.columnEmail,
                dataIndex: "email",
            },
            {
                title: intlMapping.columnRoles,
                dataIndex: "roles",
                render: (_, row) => {
                    if (row.roles.length == 0) {
                        return emptyPlaceholder
                    }
                    return (
                        <Space>
                            {row.roles.map((item) => {
                                return (
                                    <Tag key={item.id} color="arcoblue">
                                        {item.name}
                                    </Tag>
                                )
                            })}
                        </Space>
                    )
                },
            },
            {
                title: intlMapping.columnDept,
                dataIndex: "departments",
                render: (_, row) => {
                    if (row.roles.length == 0) {
                        return emptyPlaceholder
                    }
                    return (
                        <Space>
                            {row.departments.map((item) => {
                                return (
                                    <Tag key={item.id} color="arcoblue">
                                        {item.name}
                                    </Tag>
                                )
                            })}
                        </Space>
                    )
                },
            },
            {
                title: intlMapping.columnOperation,
                dataIndex: "operation",
                render: (_, item: UserListRow) => (
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
                    </Space>
                ),
            },
        ]
        return result
    }, [intlMapping])
    const [pagination, setPagination] = useState<PaginationProps>({
        sizeCanChange: true,
        showTotal: true,
        total: 0,
        pageSize: 10,
        current: 1,
        pageSizeChangeResetCurrent: true,
    })
    const [keyword, setKeyword] = useQueryState<string>("keyword", parseAsString.withDefault(""))

    const { current, pageSize } = pagination
    const [queryParams, setQueryParams] = useState<GetUserListRequest>({
        keyword: keyword,
        limit: pageSize!,
        offset: (current! - 1) * pageSize!,
    })
    const generateQueryKey = useCallback(
        (patch?: GetUserListRequest) => {
            return [
                "setting",
                "user",
                "list",
                {
                    ...queryParams,
                    ...patch,
                },
            ]
        },
        [queryParams],
    )
    const { data, isFetching } = useQuery({
        queryKey: generateQueryKey(),
        queryFn: ({ queryKey }) => {
            const params = getArrayItem(queryKey, -1) as GetUserListRequest
            return userService.getUserList(params)
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
        <CommonSettingContainer>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Row justify="space-between">
                    <Col flex={"auto"}>
                        <InputSearch
                            placeholder={intlMapping.searchPlaceholer}
                            style={{ width: 350, margin: 0 }}
                            value={keyword}
                            onChange={(v) => keywordChangeHandle(v)}
                            onSearch={() => searchHandle()}
                            allowClear
                            searchButton={true}
                        />
                    </Col>
                </Row>
                <Table
                    rowKey={"id"}
                    columns={columns}
                    data={data?.list}
                    loading={isFetching}
                    onChange={tableChangeHandle}
                    pagination={pagination}
                />
            </Space>
            <UserEditor
                visible={visible}
                readonly={readonly}
                roleId={userId}
                onOk={() => {
                    setUserId(undefined)
                    setReadonly(false)
                    setVisible(false)
                    searchHandle()
                }}
                onCancel={() => {
                    setUserId(undefined)
                    setReadonly(false)
                    setVisible(false)
                }}
            />
        </CommonSettingContainer>
    )
}
export default UserSetting
