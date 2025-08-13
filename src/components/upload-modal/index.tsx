import { FileType, fileType2Accept, fileType2ListType } from "@/constant/components/upload-modal"
import { Modal, Upload, Grid, Skeleton, Empty, Button } from "@arco-design/web-react"
import Cropper, { CropperHandle } from "./cropper"
import { useRef, useState } from "react"
import { UploadItem } from "@arco-design/web-react/es/Upload"
import { isNil } from "lodash-es"
import { css } from "@emotion/react"
import dirIcon from "@/assets/components/upload-modal/dir.png"
import {
    IconClose,
    IconFaceFrownFill,
    IconFile,
    IconPlus,
    IconUpload,
} from "@arco-design/web-react/icon"
import { BaseButtonProps } from "@arco-design/web-react/es/Button/interface"

interface UploadModalProps {
    title: string
    visible: boolean
    type: FileType
    multiple?: boolean
    limit?: number
    onOk: (items: Array<UploadItem>, files: Array<File | undefined>) => void
    onCancel: () => void
}

const UploadModal: React.FC<UploadModalProps> = ({
    title,
    visible,
    type,
    limit,
    onOk,
    onCancel,
}) => {
    const [fileList, setFileList] = useState<UploadItem[]>([])
    // const [_, setCropFileList] = useState<File[]>([])
    const [cropIndex] = useState(0)
    const cropperRef = useRef<CropperHandle>(null)
    const confirmHandle = async () => {
        const originFileList = fileList.map((item) => {
            return item.originFile
        })
        if (!isNil(cropperRef.current)) {
            switch (type) {
                case FileType.ImageWithCropper:
                    onOk(fileList, [await cropperRef.current.getImage()])
                    return
                default:
                    onOk(fileList, originFileList)
                    return
            }
        } else {
            onOk(fileList, originFileList)
        }
    }
    const isImageCropMode = [FileType.ImageWithCropper].includes(type)
    const listType = fileType2ListType[type]
    const accept = fileType2Accept[type]
    const multiple = [FileType.MultipleImage, FileType.MultipleFile].includes(type)
    const triggerMap = {
        [FileType.MultipleImage]: [<FileDirUpload />, <ButtonUpload />],
        [FileType.Image]: [<FileDirUpload />, undefined],
        [FileType.ImageWithCropper]: [undefined, undefined],
        [FileType.File]: [<FileDirUpload />, undefined],
        [FileType.MultipleFile]: [<FileDirUpload />, <ButtonUpload />],
    }
    return (
        <Modal
            title={title}
            visible={visible}
            onOk={() => confirmHandle()}
            onCancel={() => onCancel()}
            css={css`
                .arco-upload-list {
                    margin-top: 0px;
                    height: 150px;
                    overflow-y: auto;
                    overflow-x: hidden;
                    padding-right: 4px;
                    .arco-upload-list-item:first-of-type {
                        margin: 0;
                    }
                    &:empty {
                        display: none;
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
                        flex: isImageCropMode ? "0 0 80px" : 1,
                    }}
                    span={isImageCropMode ? 5 : 24}
                >
                    <Upload
                        action=""
                        limit={!multiple ? 1 : limit}
                        autoUpload={false}
                        imagePreview={false}
                        multiple={multiple}
                        listType={listType}
                        onChange={(fileList: UploadItem[]) => {
                            setFileList(fileList)
                        }}
                        style={{
                            width: isImageCropMode ? "auto" : "100%",
                        }}
                        accept={accept}
                        showUploadList={{
                            reuploadIcon: <IconUpload />,
                            cancelIcon: <IconClose />,
                            fileIcon: <IconFile />,
                            removeIcon: <IconClose />,
                            previewIcon: null,
                            errorIcon: <IconFaceFrownFill />,
                        }}
                        progressProps={{
                            formatText: (percent) => `${percent}%`,
                        }}
                        fileList={fileList}
                    >
                        {fileList.length == 0 ? triggerMap[type][0] : triggerMap[type][1]}
                    </Upload>
                </Grid.Col>
                {isImageCropMode ? (
                    <Grid.Col span={19}>
                        {fileList.length > 0 ? (
                            <Cropper ref={cropperRef} file={fileList[cropIndex].originFile!} />
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

interface UploadTriggerProps {
    description?: string | React.ReactNode
}

const FileDirUpload: React.FC<UploadTriggerProps> = ({ description }) => {
    return (
        <Empty
            style={{ marginTop: 30 }}
            icon={<img src={dirIcon} />}
            description={description ?? "点击上传文件"} // TODO:国际化
        />
    )
}

interface ButtonUploadTriggerProps extends UploadTriggerProps {
    long?: boolean
    shape?: BaseButtonProps["shape"]
    iconButton?: boolean
}

const ButtonUpload: React.FC<ButtonUploadTriggerProps> = ({
    description,
    long = true,
    shape = "round",
    iconButton = false,
}) => {
    return (
        <Button
            type="primary"
            long={long}
            shape={shape}
            icon={<IconPlus />}
            style={{ marginBottom: 20 }}
        >
            {!iconButton ? description ?? "点击上传文件" : null}
        </Button>
    )
}

export default UploadModal
