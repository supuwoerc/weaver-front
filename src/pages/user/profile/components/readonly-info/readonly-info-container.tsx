import styled from "@emotion/styled"

const ReadonlyInfoContainer = styled.div`
    .items {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        .btn-item {
            cursor: pointer;
            text-align: center;
            p {
                margin-top: 4px;
                font-weight: bold;
            }
            svg {
                transition: transform 0.3s;
            }
            &:hover {
                svg {
                    transform: scale(1.1);
                }
                p {
                    color: var(--theme-color);
                }
            }
        }
    }
`

export default ReadonlyInfoContainer
