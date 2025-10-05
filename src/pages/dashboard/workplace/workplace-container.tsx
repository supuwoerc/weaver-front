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
            justify-content: center;
            width: 100%;
            height: 260px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: var(--common-shadow);
            background-color: var(--color-bg-1);
            .item-title {
                height: 32px;
                line-height: 32px;
                padding: 0 1em;
                font-weight: bold;
                color: var(--color-text-1);
            }
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
