import { Card } from "@arco-design/web-react"
import { IntlShape, useIntl } from "react-intl"
import ReadonlyInfoContainer from "./readonly-info-container"
import { useMemo } from "react"
import RolesSvg from "@/assets/user/profile/readonly-info/role.svg?react"
import PasswordSvg from "@/assets/user/profile/readonly-info/password.svg?react"

interface InfoEditorProps {}

const getIntlMapping = (intl: IntlShape) => {
    return {
        title: intl.formatMessage({
            id: "user.infoEditor.readonlyInfo.title",
        }),
        roles: intl.formatMessage({
            id: "user.infoEditor.readonlyInfo.roles",
        }),
        password: intl.formatMessage({
            id: "user.infoEditor.readonlyInfo.password",
        }),
    }
}

const getFormItems = (intlMapping: ReturnType<typeof getIntlMapping>) => {
    // TODO:定义跳转页面
    return [
        { label: intlMapping.roles, icon: RolesSvg },
        { label: intlMapping.password, icon: PasswordSvg },
    ]
}

const InfoEditor: React.FC<InfoEditorProps> = () => {
    const intl = useIntl()
    const intlMapping = useMemo(() => {
        return getIntlMapping(intl)
    }, [intl])
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
                                <item.icon width={72} height={72} />
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
