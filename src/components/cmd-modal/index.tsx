import { useEffect, useState } from "react"
import { Avatar, Input, List, Modal, Space } from "@arco-design/web-react"
import { IconCommand } from "@arco-design/web-react/icon"
import { css } from "@emotion/react"
import { useTranslator } from "@/hooks/use-translator"

interface CmdModalProps {}

const CmdModal: React.FC<CmdModalProps> = () => {
    const [open, setOpen] = useState(false)

    const intlMapping = useTranslator({
        searchPlaceholer: "common.placeholer.search",
    })

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <div
            css={css`
                .arco-input-inner-wrapper {
                    border-radius: 20px;
                }
            `}
        >
            <Input
                style={{ width: 300 }}
                suffix={
                    <>
                        <IconCommand />
                        <span>K</span>
                    </>
                }
                placeholder={intlMapping.searchPlaceholer}
                readOnly
                onFocus={() => setOpen(true)}
            />
            <Modal
                visible={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                closable={false}
                autoFocus={true}
                focusLock={true}
                footer={null}
                title={null}
            >
                <Space
                    css={css`
                        width: 100%;
                        .arco-input-inner-wrapper {
                            border-radius: 4px;
                        }
                    `}
                    direction="vertical"
                >
                    <Input
                        style={{ width: "100%" }}
                        allowClear
                        placeholder={intlMapping.searchPlaceholer}
                    />
                    <List
                        hoverable
                        style={{ width: "100%", cursor: "pointer" }}
                        dataSource={new Array(4).fill({
                            title: "Beijing Bytedance Technology Co., Ltd.",
                            description: "Beijing ByteDance Technology Co",
                        })}
                        render={(item, index) => (
                            <List.Item key={index}>
                                <List.Item.Meta
                                    avatar={<Avatar shape="square">A</Avatar>}
                                    title={item.title}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />
                </Space>
            </Modal>
        </div>
    )
}
export default CmdModal
