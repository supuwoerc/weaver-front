import styled from "@emotion/styled"
const WorkplaceContainer = styled.div`
    height: 100%;
    padding: var(--main-padding);
    .items {
        display: grid;
        grid-template-columns: 4fr 3fr;
        gap: 10px;
        .item {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px 0;
            width: 100%;
            height: 100%;
            height: 100px;
            border-radius: 12px;
            background: var(--color-bg-2);
            overflow: hidden;
            box-shadow: var(--common-shadow);
        }
        .slot[data-swapy-highlighted] {
            background: var(--color-secondary);
            border-radius: 12px;
        }
        .item[data-swapy-dragging] {
            opacity: 0.6;
        }
    }
`
export default WorkplaceContainer
