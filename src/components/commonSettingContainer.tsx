import styled from "@emotion/styled"

export interface CommonSettingContainerProps {
    noPadding?: boolean
}

const CommonSettingContainer = styled.div<CommonSettingContainerProps>`
    padding: ${(props) => {
        if (!props.noPadding) {
            return "var(--main-padding)"
        }
        return "0px"
    }};
`
export default CommonSettingContainer
