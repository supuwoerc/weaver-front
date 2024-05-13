import styled from "@emotion/styled"
import { LogoProps, ResponsiveKey } from "."
import { isString } from "@supuwoerc/utils"
import { mediaQueries } from "@/constant/style"

const defaultColor = "#fff"

const getColor = (props: LogoContainerProps, size: ResponsiveKey = "xs") => {
    const { colorSetting: color } = props
    if (isString(color)) {
        return color || defaultColor
    }
    return color[size] || defaultColor
}

interface LogoContainerProps {
    colorSetting: NonNullable<LogoProps["color"]>
}

const LogoContainer = styled.div<LogoContainerProps>`
    ${mediaQueries.lg} {
        color: ${(props) => getColor(props, "lg")};
    }
    ${mediaQueries.md} {
        color: ${(props) => getColor(props, "md")};
    }
    ${mediaQueries.sm} {
        color: ${(props) => getColor(props, "sm")};
    }
    ${mediaQueries.xl} {
        color: ${(props) => getColor(props, "xl")};
    }
    ${mediaQueries.xs} {
        color: ${(props) => getColor(props, "xs")};
    }
    ${mediaQueries.xxl} {
        color: ${(props) => getColor(props, "xxl")};
    }
    ${mediaQueries.xxxl} {
        color: ${(props) => getColor(props, "xxxl")};
    }
`

export default LogoContainer
