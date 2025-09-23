import { TreeSelect } from "@arco-design/web-react"
import { FC, useState } from "react"

interface UserTreeSelectProps {
    width?: number
    maxHeight?: number
}

const UserTreeSelect: FC<UserTreeSelectProps> = ({ width = 300, maxHeight = 300 }) => {
    const [treeData, setTreeData] = useState([])
    const [value, setValue] = useState("node2")
    const loadMore = (node: any, dataRef: any) => {
        const { title, _key: key } = node.props
        const children = [
            {
                title: `${title}-0`,
                value: `${title}-0`,
                key: `${key}-0`,
            },
            {
                title: `${title}-1`,
                value: `${title}-1`,
                key: `${key}-1`,
            },
        ]
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                dataRef.children = children
                setTreeData([...treeData])
                resolve()
            }, 1000)
        })
    }
    return (
        <TreeSelect
            showSearch
            treeData={treeData}
            value={value}
            onChange={setValue}
            loadMore={loadMore}
            triggerProps={{
                popupStyle: {
                    maxHeight,
                },
            }}
            style={{ width }}
        />
    )
}
export default UserTreeSelect
