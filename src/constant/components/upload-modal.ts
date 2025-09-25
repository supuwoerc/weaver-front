import { UploadProps } from "@arco-design/web-react"

// 上传文件的类型
export enum fileType {
    multipleImage = 1, // 多张图片上传
    image, // 单张图片上传
    imageWithCropper, // 单张图片上传 & 裁剪
    File, // 单个文件
    multipleFile, // 多个文件
}

export const fileType2ListType: Record<fileType, UploadProps["listType"]> = {
    [fileType.multipleImage]: "picture-list",
    [fileType.image]: "picture-list",
    [fileType.imageWithCropper]: "picture-card",
    [fileType.File]: "text",
    [fileType.multipleFile]: "text",
}

const imageAccept: UploadProps["accept"] = {
    type: ".jpg,.jpeg,.png,.gif",
    strict: true,
}

const fileAccept: UploadProps["accept"] = {
    type: ".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.ppt,.mp3,.mp4,.zip,.7z,.rar,.flv,.txt,.xls,.xlsx,.sql,.js,.css,.html,.css",
    strict: true,
}

export const fileType2Accept: Record<fileType, UploadProps["accept"]> = {
    [fileType.multipleImage]: imageAccept,
    [fileType.image]: imageAccept,
    [fileType.imageWithCropper]: imageAccept,
    [fileType.File]: fileAccept,
    [fileType.multipleFile]: fileAccept,
}
