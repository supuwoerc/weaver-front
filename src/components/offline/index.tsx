import { CSSProperties, useRef } from "react"
import { css } from "@emotion/react"
import { WifiOff } from "lucide-react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

interface OfflineProps {
    style?: CSSProperties
}

const Offline: React.FC<OfflineProps> = ({ style }) => {
    const offlineRef = useRef<HTMLDivElement>(null)
    useGSAP(
        () => {
            const logoSvg = offlineRef.current?.querySelector<SVGPathElement>("svg")
            if (logoSvg) {
                gsap.to(logoSvg, {
                    repeat: -1,
                    yoyo: true,
                    opacity: 0.1,
                    duration: 0.6,
                })
            }
        },
        { scope: offlineRef.current!, dependencies: [] },
    )
    return (
        <div
            ref={offlineRef}
            css={css`
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            `}
        >
            <WifiOff size={50} />
        </div>
    )
}
export default Offline
