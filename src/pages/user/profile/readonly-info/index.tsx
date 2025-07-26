import { Card } from "@arco-design/web-react"
import ReadonlyInfoContainer from "./readonly-info-container"
import { useMemo } from "react"
import RolesIcon from "@/assets/user/profile/readonly-info/role.png"
import PasswordIcon from "@/assets/user/profile/readonly-info/password.png"
import { useTranslator } from "@/hooks/use-translator"

interface InfoEditorProps {}

const intlMap = {
    title: "user.infoEditor.readonlyInfo.title",
    roles: "user.infoEditor.readonlyInfo.roles",
    password: "user.infoEditor.readonlyInfo.password",
} as const

const getFormItems = (intlMapping: Record<keyof typeof intlMap, string>) => {
    // TODO:定义跳转页面
    return [
        { label: intlMapping.roles, icon: RolesIcon },
        { label: intlMapping.password, icon: PasswordIcon },
    ]
}

const InfoEditor: React.FC<InfoEditorProps> = () => {
    const intlMapping = useTranslator(intlMap)
    const formItems = useMemo(() => {
        return getFormItems(intlMapping)
    }, [intlMapping])
    return (
        <ReadonlyInfoContainer>
            <Card title={intlMapping.title} hoverable bordered={false}>
                <div className="items">
                    {formItems.map((item) => {
                        return (
                            <div className="btn-item" key={item.label} title={item.label}>
                                <img src={item.icon} alt={item.label} width={72} height={72} />
                                <div>{item.label}</div>
                            </div>
                        )
                    })}
                </div>
            </Card>
        </ReadonlyInfoContainer>
    )
}
export default InfoEditor
