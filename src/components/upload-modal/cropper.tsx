import { Grid } from "@arco-design/web-react"
import { IconRotateRight } from "@arco-design/web-react/icon"
import { forwardRef, useImperativeHandle, useMemo, useState } from "react"
import EasyCropper, { Area } from "react-easy-crop"

async function getCroppedImg(
    url: string,
    pixelCrop: Area | undefined,
    rotation = 0,
): Promise<null | BlobPart> {
    const image: HTMLImageElement = await new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener("load", () => resolve(image))
        image.addEventListener("error", (error) => reject(error))
        image.src = url
    })
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx || !image) {
        return null
    }
    const imageSize = 2 * ((Math.max(image.width, image.height) / 2) * Math.sqrt(2))
    canvas.width = imageSize
    canvas.height = imageSize
    if (rotation) {
        ctx.translate(imageSize / 2, imageSize / 2)
        ctx.rotate((rotation * Math.PI) / 180)
        ctx.translate(-imageSize / 2, -imageSize / 2)
    }
    ctx.drawImage(image, imageSize / 2 - image.width / 2, imageSize / 2 - image.height / 2)
    const data = ctx.getImageData(0, 0, imageSize, imageSize)
    canvas.width = pixelCrop?.width ?? 100
    canvas.height = pixelCrop?.height ?? 100
    ctx.putImageData(
        data,
        Math.round(0 - imageSize / 2 + image.width * 0.5 - (pixelCrop?.x ?? 0)),
        Math.round(0 - imageSize / 2 + image.height * 0.5 - (pixelCrop?.y ?? 0)),
    )
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob)
        })
    })
}

interface CropperProps {
    file: File
}

export interface CropperHandle {
    getImage: () => Promise<File | undefined>
}

const Cropper = forwardRef<CropperHandle, CropperProps>(({ file }, ref) => {
    const [crop, setCrop] = useState({
        x: 0,
        y: 0,
    })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>()
    const url = useMemo(() => {
        return URL.createObjectURL(file)
    }, [file])

    const getImage = async () => {
        const blob = await getCroppedImg(url || "", croppedAreaPixels, rotation)
        if (blob) {
            const croppedImage = new File([blob], file.name || "image", {
                type: file.type || "image/*",
            })
            return croppedImage
        }
        return undefined
    }

    useImperativeHandle(ref, () => {
        return {
            getImage,
        }
    })

    return (
        <div
            style={{
                width: "100%",
                height: "200px",
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
            }}
        >
            <EasyCropper
                style={{
                    containerStyle: {
                        width: "100%",
                        height: "100%",
                    },
                }}
                aspect={1}
                image={url}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                showGrid={false}
                onRotationChange={setRotation}
                cropShape="round"
                onCropComplete={(_, croppedAreaPixels) => {
                    setCroppedAreaPixels(croppedAreaPixels)
                }}
                onCropChange={setCrop}
                onZoomChange={setZoom}
            />
            <Grid.Row justify="end">
                <IconRotateRight
                    style={{
                        cursor: "pointer",
                        zIndex: 2,
                        color: "#fff",
                        margin: 10,
                        fontSize: 20,
                    }}
                    onClick={() => {
                        setRotation(rotation + 90)
                    }}
                />
            </Grid.Row>
        </div>
    )
})
export default Cropper
