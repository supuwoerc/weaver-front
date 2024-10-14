import styled from "@emotion/styled"

export interface UserInfoContainerProps {
    backageImage?: string
}

const UserInfoContainer = styled.div<UserInfoContainerProps>`
    min-height: 300px;
    .simple-info {
        height: 140px;
        background-image: url(${(props) => props.backageImage});
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        align-items: flex-start;
        padding: 32px 6%;
        position: relative;
        .arco-upload {
            .favicon {
                position: relative;
                .user-favicon {
                    border: 2px solid #fff;
                    height: 82px;
                    width: 82px;
                    border-radius: 50%;
                    padding: 4px;
                    flex: 0 0 82px;
                }
                .arco-btn {
                    position: absolute;
                    right: 8px;
                    bottom: 6px;
                    width: 20px;
                    height: 20px;
                }
            }
        }
        .arco-upload-list {
            display: none;
        }
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
                svg {
                    margin-right: 4px;
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
        padding: var(--main-padding) 6%;
    }
`
export default UserInfoContainer
