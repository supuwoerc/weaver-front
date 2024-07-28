import { Modal, VerificationCode, Image, Skeleton, Tooltip } from "@arco-design/web-react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import captchaService from "@/service/captcha"
import { FormattedMessage } from "react-intl"
import Meta from "@arco-design/web-react/es/Card/meta"
import { IconRefresh } from "@arco-design/web-react/icon"
import VerificationCard from "./verification-card"
import { useEffect, useState } from "react"

interface VerificationModalProps {
    visible: boolean
    finishHandle: (id: string, v: string) => void
}
const queryKey = ["captcha", "generate"]
const VerificationModal: React.FC<VerificationModalProps> = ({ visible, finishHandle }) => {
    const { data, isFetching, error } = useQuery(
        queryKey,
        () => {
            return captchaService.getCaptcha()
        },
        {
            cacheTime: 0,
            enabled: visible,
        },
    )
    const client = useQueryClient()
    const [code, setCode] = useState("")
    const regenerateHandle = () => {
        client.invalidateQueries(queryKey)
    }
    useEffect(() => {
        if (visible) {
            setCode("")
        }
    }, [visible])
    return (
        <Modal
            title={null}
            closeIcon={null}
            visible={visible}
            autoFocus={true}
            hideCancel={true}
            focusLock={true}
            footer={null}
            style={{ width: "auto" }}
        >
            <VerificationCard
                style={{ width: 380 }}
                cover={
                    <Skeleton
                        loading={isFetching}
                        text={{ rows: 0 }}
                        image={{
                            style: {
                                width: 380,
                            },
                        }}
                    >
                        <div
                            style={{
                                overflow: "hidden",
                                textAlign: "center",
                                padding: "4px 0",
                            }}
                        >
                            <Image
                                preview={false}
                                loader={
                                    <Skeleton
                                        image={{ style: { width: 380, height: 100 } }}
                                        text={false}
                                        animation
                                    />
                                }
                                width={380}
                                height={100}
                                src={data?.base64}
                                alt={error as string}
                            />
                        </div>
                    </Skeleton>
                }
            >
                <Meta
                    avatar={
                        <Skeleton
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: 4,
                            }}
                            text={{ rows: 1, width: 64 }}
                            loading={false}
                        >
                            <VerificationCode
                                value={code}
                                size="large"
                                onChange={(v) => setCode(v)}
                                onFinish={(v) => finishHandle(data?.id ?? "", v)}
                            />
                            <Tooltip content={<FormattedMessage id="captcha.modal.regenerate" />}>
                                <IconRefresh
                                    style={{ fontSize: 24, cursor: "pointer" }}
                                    onClick={regenerateHandle}
                                />
                            </Tooltip>
                        </Skeleton>
                    }
                    title={
                        <Skeleton
                            loading={false}
                            style={{ marginTop: 0 }}
                            text={{
                                rows: 1,
                                width: 72,
                            }}
                        >
                            <FormattedMessage id="captcha.modal.title" />
                        </Skeleton>
                    }
                />
            </VerificationCard>
        </Modal>
    )
}
export default VerificationModal
