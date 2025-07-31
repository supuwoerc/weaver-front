import { UploadProps } from "@arco-design/web-react"

// 上传文件的类型
export enum FileType {
    MultipleImage = 1, // 多张图片上传
    Image, // 单张图片上传
    ImageWithCropper, // 单张图片上传 & 裁剪
    File, // 单个文件
    MultipleFile, // 多个文件
}

export const fileType2ListType: Record<FileType, UploadProps["listType"]> = {
    [FileType.MultipleImage]: "picture-list",
    [FileType.Image]: "picture-list",
    [FileType.ImageWithCropper]: "picture-card",
    [FileType.File]: "text",
    [FileType.MultipleFile]: "text",
}

const imageAccept: UploadProps["accept"] = {
    type: ".jpg,.jpeg,.png,.gif",
    strict: true,
}

const fileAccept: UploadProps["accept"] = {
    type: ".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.ppt,.mp3,.mp4,.zip,.7z,.rar,.flv,.txt,.xls,.xlsx,.sql,.js,.css,.html,.css",
    strict: true,
}

export const fileType2Accept: Record<FileType, UploadProps["accept"]> = {
    [FileType.MultipleImage]: imageAccept,
    [FileType.Image]: imageAccept,
    [FileType.ImageWithCropper]: imageAccept,
    [FileType.File]: fileAccept,
    [FileType.MultipleFile]: fileAccept,
}
