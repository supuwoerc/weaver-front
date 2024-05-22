import { system } from "@/store"
import { Button } from "@arco-design/web-react"
import { IconMoonFill, IconSunFill } from "@arco-design/web-react/icon"
import { CSSProperties, useEffect } from "react"
import { useRecoilState } from "recoil"

interface ThemeSelectProps {
    style?: CSSProperties
}

const ThemeSelect: React.FC<ThemeSelectProps> = ({ style }) => {
    const [theme, setTheme] = useRecoilState(system.theme)
    const onClickHandle = () => {
        const target = theme === "dark" ? "light" : "dark"
        setTheme(target)
    }
    useEffect(() => {
        if (theme === "dark") {
            document.body.setAttribute("arco-theme", "dark")
        } else {
            document.body.removeAttribute("arco-theme")
        }
    }, [theme])
    return (
        <div style={style}>
            <Button type="secondary" shape="circle" onClick={onClickHandle}>
                {theme === "dark" ? <IconSunFill /> : <IconMoonFill />}
            </Button>
        </div>
    )
}
export default ThemeSelect
