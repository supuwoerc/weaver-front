import { Modal, VerificationCode, Image, Skeleton, Tooltip, Progress } from "@arco-design/web-react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import captchaService from "@/service/captcha"
import { FormattedMessage } from "react-intl"
import Meta from "@arco-design/web-react/es/Card/meta"
import { IconRefresh } from "@arco-design/web-react/icon"
import VerificationCard from "./verification-card"
import { useCallback, useEffect, useRef, useState } from "react"

interface VerificationModalProps {
    visible: boolean
    finishHandle: (id: string, v: string) => void
}
const queryKey = ["captcha", "generate"]
const defaultTime = 60
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
    const regenerateHandle = useCallback(() => {
        setTime(defaultTime)
        timer.current && clearInterval(timer.current)
        client.invalidateQueries(queryKey)
    }, [client])
    useEffect(() => {
        if (visible) {
            setCode("")
        }
    }, [visible])
    const [time, setTime] = useState(defaultTime)
    const timer = useRef<ReturnType<typeof setTimeout>>()
    useEffect(() => {
        if (visible && !isFetching && data && data.base64) {
            timer.current = setTimeout(() => {
                if (time > 0) {
                    setTime((prev) => prev - 1)
                } else {
                    regenerateHandle()
                }
            }, 1000)
        }
        return () => {
            timer.current && clearInterval(timer.current)
        }
    }, [visible, isFetching, data, time, regenerateHandle])
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
                                padding: "4px 16px",
                                boxSizing: "border-box",
                            }}
                        >
                            <Image
                                preview={false}
                                loader={
                                    <Skeleton
                                        image={{ style: { width: 348, height: 100 } }}
                                        text={false}
                                        animation
                                    />
                                }
                                style={{ borderRadius: 0 }}
                                title={`${time}s`}
                                width={348}
                                height={100}
                                src={data?.base64}
                                alt={error as string}
                            />
                            <Progress
                                type="line"
                                showText={false}
                                percent={(time * 100) / defaultTime}
                                trailColor="var(--color-primary-light-1)"
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
                                    className="refresh-btn"
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
