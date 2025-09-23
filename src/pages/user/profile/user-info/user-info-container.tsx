import styled from "@emotion/styled"

export interface UserInfoContainerProps {
    backageImage?: string
}

const UserInfoContainer = styled.div<UserInfoContainerProps>`
    height: 400px;
    display: flex;
    flex-direction: column;
    .simple-info {
        height: 130px;
        flex: 0 0 auto;
        background-image: url(${(props) => props.backageImage});
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        align-items: flex-start;
        padding: 32px 6%;
        position: relative;
        .desc {
            margin-left: 12px;
            padding-top: 4px;
            overflow: hidden;
            > p,
            > div {
                display: flex;
                align-items: center;
                margin-bottom: 4px;
                &.name {
                    font-weight: bold;
                    font-size: 16px;
                }
                .arco-tag {
                    padding: 0 4px;
                }
            }
        }
        .warning {
            position: absolute;
            top: 12px;
            right: 12px;
            color: rgb(var(--red-6));
            cursor: pointer;
        }
    }
    .operations {
        flex: 1;
        overflow-y: auto;
        padding: var(--main-padding) 6%;
    }
`
export default UserInfoContainer
