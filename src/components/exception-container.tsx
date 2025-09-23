import styled from "@emotion/styled"

const Exception = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    .image {
        width: 200px;
        height: 200px;
    }
    .info {
        box-sizing: border-box;
        height: 200px;
        max-width: 300px;
        padding: 20px 0.5em;
        padding-bottom: 40px;
        margin-left: 1em;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        .desc {
            .title {
                font-size: 40px;
                font-weight: bold;
            }
            .tips {
                margin-top: 16px;
                font-weight: bold;
            }
        }
    }
`
export default Exception
