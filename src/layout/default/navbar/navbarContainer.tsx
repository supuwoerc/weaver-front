import styled from "@emotion/styled"

const NavbarContainer = styled.div`
    height: 60px;
    background-color: var(--color-bg-2);
    box-shadow: var(--common-shadow);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    .trigger {
        border-radius: 2px;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
            background: var(--color-secondary);
        }
    }
`
export default NavbarContainer
