import { PropsWithChildren } from "react"

interface InitAppStateProps {}

const CheckLogin: React.FC<PropsWithChildren<InitAppStateProps>> = ({ children }) => {
    // TODO:判断需不需要登录
    return <>{children}</>
}

export default CheckLogin
