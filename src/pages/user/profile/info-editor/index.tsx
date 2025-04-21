import { Card, Form, Input, Link } from "@arco-design/web-react"
import InfoEditorContainer from "./info-editor-container"
import { useMemo, useState } from "react"
import FormItem from "@arco-design/web-react/es/Form/form-item"
import Row from "@arco-design/web-react/es/Grid/row"
import Col from "@arco-design/web-react/es/Grid/col"
import { useTranslator } from "@/hooks/useTranslator"

interface InfoEditorProps {}

const intlMap = {
    save: "user.infoEditor.info.sava",
    edit: "user.infoEditor.info.edit",
    title: "user.infoEditor.info.title",
    formEmail: "user.infoEditor.form.email",
    formPassword: "user.infoEditor.form.password",
    formNickname: "user.infoEditor.form.nickname",
    formGender: "user.infoEditor.form.gender",
    formAbout: "user.infoEditor.form.about",
    formBirthday: "user.infoEditor.form.birthday",
    formRoles: "user.infoEditor.form.roles",
    formRule: "user.infoEditor.form.rule",
} as const

const getFormItems = (intlMapping: Record<keyof typeof intlMap, string>) => {
    return [
        { label: intlMapping.formNickname, required: true },
        { label: intlMapping.formEmail, required: true },
        { label: intlMapping.formGender, required: false },
        { label: intlMapping.formBirthday, required: false },
        { label: intlMapping.formAbout, required: false },
        { label: intlMapping.formRoles, required: false },
    ]
}

const InfoEditor: React.FC<InfoEditorProps> = () => {
    const [isEdit, setIsEdit] = useState(false)
    const intlMapping = useTranslator(intlMap)
    const formItems = useMemo(() => {
        return getFormItems(intlMapping)
    }, [intlMapping])
    return (
        <InfoEditorContainer>
            <Card
                title={intlMapping.title}
                hoverable
                bordered={false}
                extra={
                    <Link onClick={() => setIsEdit(!isEdit)}>
                        {isEdit ? intlMapping.save : intlMapping.edit}
                    </Link>
                }
            >
                <Form autoComplete="off" layout={"vertical"} disabled={!isEdit}>
                    <Row gutter={[14, 0]}>
                        {formItems.map((item) => {
                            return (
                                <Col span={12} key={item.label}>
                                    <FormItem
                                        label={item.label}
                                        rules={
                                            item.required
                                                ? [
                                                      {
                                                          required: true,
                                                          message: intlMapping.formRule,
                                                      },
                                                  ]
                                                : []
                                        }
                                    >
                                        <Input placeholder={intlMapping.formRule} />
                                    </FormItem>
                                </Col>
                            )
                        })}
                    </Row>
                </Form>
            </Card>
        </InfoEditorContainer>
    )
}
export default InfoEditor
