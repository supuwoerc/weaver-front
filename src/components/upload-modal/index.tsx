import { FileType } from "@/constant/components/upload-modal"
import { Modal, Upload, Grid, Skeleton, Empty, Button } from "@arco-design/web-react"
import Cropper, { CropperHandle } from "./cropper"
import { useRef, useState } from "react"
import { UploadItem } from "@arco-design/web-react/es/Upload"
import { isNil } from "lodash-es"
import { css } from "@emotion/react"
import dirIcon from "@/assets/components/upload-modal/dir.png"

interface UploadModalProps {
    multiple?: boolean // 开启裁剪功能时仅支持单张上传
    crop?: boolean // 仅当上传文件类型为图片时才生效
    type?: FileType
    visible: boolean
    imagePreview?: boolean
    title: string
    showFileList?: boolean
    limit?: number
    listType?: "text" | "picture-list" | "picture-card"
    onOk: () => void
    onCancel: () => void
}

const UploadModal: React.FC<UploadModalProps> = ({
    title,
    visible,
    imagePreview,
    onOk,
    onCancel,
    type,
    crop,
    multiple,
    listType,
    limit,
}) => {
    const [fileList, setFileList] = useState<UploadItem[]>([])
    const cropperRef = useRef<CropperHandle>(null)
    const confirmHandle = async () => {
        if (!isNil(cropperRef.current)) {
            await cropperRef.current.getImage()
        }
        onOk()
    }
    const isImageMode = type === FileType.Image
    return (
        <Modal
            title={title}
            visible={visible}
            onOk={() => confirmHandle()}
            onCancel={() => onCancel()}
            css={css`
                .arco-upload-list {
                    margin-top: 20px;
                    height: 150px;
                    overflow-y: auto;
                    overflow-x: hidden;
                    padding-right: 4px;
                    .arco-upload-list-item:first-of-type {
                        margin: 0;
                    }
                    &:empty {
                        height: 0;
                    }
                }
            `}
        >
            <Grid.Row
                style={{ width: "100%", height: "200px" }}
                justify="space-between"
                align="start"
            >
                <Grid.Col
                    style={{
                        flex: isImageMode ? "0 0 80px" : 1,
                    }}
                    span={isImageMode ? 5 : 24}
                >
                    <Upload
                        action=""
                        limit={!multiple ? 1 : limit}
                        autoUpload={false}
                        imagePreview={imagePreview}
                        multiple={multiple}
                        listType={listType}
                        onChange={(fileList: UploadItem[]) => {
                            setFileList(fileList)
                        }}
                        style={{
                            width: isImageMode ? "auto" : "100%",
                        }}
                    >
                        {(type !== FileType.Image || !crop) &&
                            (fileList.length == 0 ? (
                                <Empty
                                    style={{ marginTop: "30px" }}
                                    icon={<img src={dirIcon} />}
                                    description={"点击上传文件"} // TODO:国际化
                                />
                            ) : (
                                <Button type="primary" long>
                                    上传文件
                                </Button>
                            ))}
                    </Upload>
                </Grid.Col>
                {isImageMode && crop ? (
                    <Grid.Col span={19}>
                        {fileList.length > 0 ? (
                            <Cropper ref={cropperRef} file={fileList[0].originFile!}></Cropper>
                        ) : (
                            <Skeleton
                                text={{
                                    rows: 5,
                                }}
                            />
                        )}
                    </Grid.Col>
                ) : null}
            </Grid.Row>
        </Modal>
    )
}
export default UploadModal
