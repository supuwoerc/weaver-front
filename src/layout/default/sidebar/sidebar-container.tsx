import styled from "@emotion/styled"

const SidebarContainer = styled.div`
    width: auto;
    height: 100%;
    .arco-menu {
        .arco-menu-item,
        .arco-menu-inline-header {
            border-radius: 12px;
            padding-right: 30px;
        }
        .arco-menu-item-inner {
            .arco-spin {
                position: absolute;
                right: 0px;
                top: 50%;
                transform: translateY(-50%);
                padding-right: 8px;
                .arco-icon {
                    color: rgb(var(--primary-6)) !important;
                    margin: 0 !important;
                }
            }
        }
    }
`

export default SidebarContainer
